require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cron = require("node-cron");
const nodemailer = require("nodemailer");

const generateRaffleWinnerEmail = require("./emailTemplates/raffle-winner");
const generateRaffleResultsEmail = require("./emailTemplates/raffle-results");
const { default: Stripe } = require("stripe");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

// MongoDB Connection
const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.DB_NAME);
const rafflesCollection = db.collection("raffles");
const entriesCollection = db.collection("entries");
const winnersCollection = db.collection("winners");
const billingCollection = db.collection("billing");
const usersCollection = db.collection("users");

// Nodemailer Email Setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "hello@raffily.co.uk", // Your email address
    pass: "vipmdlkuuggluhmg", // Your email password or app-specific password
  },
});

// Function to Send Emails
async function sendEmail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: "hello@raffily.co.uk",
      to,
      subject,
      html, // Use HTML content instead of plain text
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
}

// Function to Pick a Random Winner
async function pickWinner(raffleId) {
  const entries = await entriesCollection
    .find({ raffleId: new ObjectId(raffleId) })
    .toArray();

  if (entries.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * entries.length);
  return entries[randomIndex];
}

// Function to Calculate Additional Charges for Questions
async function calculateAdditionalCharges(raffleId) {
  const entries = await entriesCollection
    .find({ raffleId: new ObjectId(raffleId) })
    .toArray();

  let totalAdditionalCharge = 0;

  for (const entry of entries) {
    const answers = entry.answers || {};
    const answeredQuestionsCount = Object.keys(answers).filter((key) =>
      answers[key]?.trim()
    ).length;

    totalAdditionalCharge += answeredQuestionsCount * 0.25; // 25 pence per question
  }

  return totalAdditionalCharge;
}

// Function to Process Expired Raffles
async function processRaffles() {
  try {
    await client.connect();
    const currentTime = new Date();
    const expiredRaffles = await rafflesCollection
      .find({
        status: "active",
        $or: [
          { endDate: { $lte: currentTime } },
          { endDate: { $lte: currentTime.toISOString() } }, // Check ISO string format as well
        ],
      })
      .toArray();
    console.log(`🔍 Found ${expiredRaffles.length} expired raffles.`);
    for (const raffle of expiredRaffles) {
      console.log(`🎉 Processing raffle ${raffle._id}`);

      const session = client.startSession();
      session.startTransaction();

      try {
        const winnerEntry = await pickWinner(raffle._id.toString());

        if (winnerEntry) {
          await winnersCollection.insertOne(
            {
              raffleId: raffle._id,
              entryId: winnerEntry._id,
              createdAt: new Date(),
            },
            { session }
          );

          console.log(`🏆 Winner selected: Entry ${winnerEntry._id}`);

          const merchantUser = await usersCollection.findOne(
            { _id: new ObjectId(raffle.merchantId) },
            { session }
          );
          const totalEntries = await entriesCollection.countDocuments(
            { raffleId: raffle._id },
            { session }
          );

          const entryCharge = totalEntries * 0.25;
          const additionalCharge = await calculateAdditionalCharges(raffle._id);
          const totalCharge = entryCharge + additionalCharge;

          if (!merchantUser || !merchantUser.stripeCustomerId) {
            console.log(
              `❌ No Stripe customer ID found for merchant ${raffle.merchantId}`
            );
          } else {
            const stripeCustomerId = merchantUser.stripeCustomerId;

            try {
              // Retrieve the default payment method for the customer
              const customer = await stripe.customers.retrieve(
                stripeCustomerId
              );
              const defaultPaymentMethod =
                customer.invoice_settings.default_payment_method;

              if (!defaultPaymentMethod) {
                console.log(
                  `❌ No default payment method found for Stripe customer ${stripeCustomerId}`
                );
              } else {
                // Charge the user automatically
                const paymentIntent = await stripe.paymentIntents.create({
                  amount: totalCharge * 100, // Convert GBP to pence
                  currency: "gbp",
                  customer: stripeCustomerId,
                  payment_method: defaultPaymentMethod,
                  confirm: true,
                  off_session: true, // ✅ Enables automated payments
                  description: `Charge for raffle ${raffle.title}`,
                  shipping: {
                    name: "Test User", // Dummy name
                    address: {
                      line1: "123 Test Street",
                      city: "London",
                      state: "ENG",
                      country: "GB",
                      postal_code: "SW1A 1AA",
                    },
                  },
                });

                if (paymentIntent.status === "succeeded") {
                  console.log(
                    `💳 Successfully charged ${totalCharge * 100} pence`
                  );
                  console.log("payment intent:---", paymentIntent);
                  // Save transaction details
                  await billingCollection.insertOne({
                    raffleId: raffle._id,
                    paymentDetails: {
                      paymentIntentId: paymentIntent.id,
                      amount: totalCharge,
                      currency: "GBP",
                      status: paymentIntent.status,
                    },
                    createdAt: new Date(),
                  });

                  // Generate and send email to the winner
                  const winnerEmailContent = generateRaffleWinnerEmail({
                    name:
                      `${winnerEntry.firstName} ${winnerEntry.lastName}` ||
                      "Valued Customer",
                    raffleName: raffle?.title || "Raffle",
                    merchantName: merchantUser?.firstName || "Merchant",
                    prize: raffle?.prize || "Prize",
                    claimUrl: `https://www.raffilybusiness.com/claim-prize/${raffle._id}`,
                    contactEmail:
                      merchantUser?.email || "support@raffilybusiness.com",
                  });

                  await sendEmail(
                    winnerEntry?.email || "support@raffilybusiness.com",
                    "🎉 Congratulations! You won the raffle!",
                    winnerEmailContent
                  );

                  // Generate and send email to the merchant
                  const merchantEmailContent = generateRaffleResultsEmail({
                    name:
                      `${merchantUser?.firstName} ${merchantUser?.lastName}` ||
                      "Merchant",
                    businessName:
                      merchantUser?.businessName || "Raffily Business",
                    raffleName: raffle?.title || "Raffle",
                    dashboardUrl: `https://www.raffilybusiness.com/dashboard`,
                    totalEntries: raffle?.maxTickets || 0,
                    viewsToEntryRate: `${totalEntries}` || "0",
                    winnerName:
                      `${winnerEntry.firstName} ${winnerEntry.lastName}` ||
                      "Winner",
                    winnerEmail: winnerEntry?.email || "Not provided",
                    demographicData: raffle?.demographicData || {},
                    previousRaffleEntries: raffle?.previousRaffleEntries || 0,
                    createNewRaffleUrl: `https://raffilybusiness.com/${
                      merchantUser?._id || "default"
                    }/${raffle?._id}`,
                  });

                  await sendEmail(
                    merchantUser?.email || "support@raffilybusiness.com",
                    "🏆 Raffle Results Summary",
                    merchantEmailContent
                  );

                  console.log(
                    `✅ Payment details recorded for raffle ${raffle._id}`
                  );
                }
              }
            } catch (error) {
              console.error(`❌ Failed to charge customer:`, error);
              
              // Send payment failure email to merchant
              const paymentFailureEmail = `
                <h2>Payment Failed for Raffle: ${raffle.title}</h2>
                <p>Dear ${merchantUser?.firstName || 'Merchant'},</p>
                <p>The payment for your raffle "${raffle.title}" has been declined.</p>
                <p>To complete the raffle and receive the results, please update your payment method in your dashboard.</p>
                <p>Total amount to be charged: £${totalCharge}</p>
                <p><a href="https://www.raffilybusiness.com/dashboard/payment-settings">Update Payment Method</a></p>
                <p>Best regards,<br>Raffily Team</p>
              `;
              
              // await sendEmail(
              //   merchantUser?.email || "support@raffilybusiness.com",
              //   "❌ Raffle Payment Failed - Action Required",
              //   paymentFailureEmail
              // );
              
              throw error;
            }
          }
        } else {
          console.log(`❌ No winner for raffle ${raffle._id} (no entries)`);
        }

        await rafflesCollection.updateOne(
          { _id: raffle._id },
          { $set: { status: "ended" } },
          { session }
        );

        console.log(`✅ Raffle ${raffle._id} marked as ENDED`);
        await session.commitTransaction();

        // await session.abortTransaction();
      } catch (error) {
        console.error(`❌ Error processing raffle ${raffle._id}:`, error);
        await session.abortTransaction();
      } finally {
        session.endSession();
      }
    }

    console.log("🎯 All expired raffles processed");
  } catch (error) {
    console.error("❌ Error processing raffles:", error);
  }
}

// Schedule the cron job (Runs every 1 minute)
cron.schedule("* * * * *", async () => {
  console.log("⏳ Running cron job: Checking expired raffles...");
  await processRaffles();
});

// Express Server (Optional)
app.get("/", (req, res) => {
  res.send("Raffle cron job service is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


