require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cron = require("node-cron");
const nodemailer = require("nodemailer");

const generateRaffleWinnerEmail = require("./emailTemplates/raffle-winner");
const generateRaffleResultsEmail = require("./emailTemplates/raffle-results");
const { default: Stripe } = require("stripe");

const app = express();
const PORT = process.env.PORT || 5000;

const stripe = new Stripe(
  "sk_test_51OZsFnSHVmksIjgkW3r9bAFSCZU4s7JiIK0dkKMjTQkzoCxCeN6AhRjpLTPviioRmvmc3QfTNefCF5wObcaN41Kl00XiyrfuQZ",
  {
    apiVersion: "2023-10-16",
  }
);

// MongoDB Connection
const client = new MongoClient(
  "mongodb+srv://ben:2qOXsIvFGqDs3tk6@cluster0.wla45.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
const db = client.db("raffily");
const rafflesCollection = db.collection("raffles");
const entriesCollection = db.collection("entries");
const winnersCollection = db.collection("winners");
const billingCollection = db.collection("billing");
const usersCollection = db.collection("users");

// Nodemailer Email Setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "neeraj@antheminfotech.com", // Your email address
    pass: "pcwgfixsrnvingtv", // Your email password or app-specific password
  },
});

// Function to Send Emails
async function sendEmail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: "neeraj@antheminfotech.com",
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
      .find({ status: "active", endDate: { $lte: currentTime } })
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
          // Generate and send email to the winner
          const winnerEmailContent = generateRaffleWinnerEmail({
            name:
              `${winnerEntry.firstName} ${winnerEntry.lastName}` ||
              "Valued Customer",
            raffleName: raffle?.title || "Raffle",
            merchantName: merchantUser?.firstName || "Merchant",
            prize: raffle?.prize || "Prize",
            claimUrl: `https://www.raffilybusiness.com/claim-prize/${raffle._id}`,
            contactEmail: merchantUser?.email || "support@raffilybusiness.com",
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
            businessName: merchantUser?.businessName || "Raffily Business",
            raffleName: raffle?.title || "Raffle",
            dashboardUrl: `https://www.raffilybusiness.com/dashboard`,
            totalEntries: raffle?.maxTickets || 0,
            viewsToEntryRate: `${totalEntries}` || "0",
            winnerName:
              `${winnerEntry.firstName} ${winnerEntry.lastName}` || "Winner",
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
                // Create the PaymentIntent using the default payment method
                await stripe.paymentIntents.create({
                  amount: totalCharge * 100, // Convert to smallest currency unit (pence)
                  currency: "gbp",
                  customer: stripeCustomerId, // Use the Stripe customer ID
                  payment_method: defaultPaymentMethod, // Use the default payment method
                  confirm: true,
                  description: `Charge for raffle ${raffle.title}`,
                  return_url: "https://raffilybusiness.com/dashboard",
                });

                console.log(
                  `💳 Merchant charged ${totalCharge * 100} pence for raffle ${
                    raffle._id
                  }`
                );
              }
            } catch (error) {
              console.error(
                `❌ Failed to charge merchant ${raffle.merchantId}:`,
                error
              );
              throw error; // Abort transaction if payment fails
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

// Function to Send Demo Emails
// async function sendDemoEmails() {
//   try {
//     // Generate dynamic content for the winner email
//     const winnerEmailContent = generateRaffleWinnerEmail({
//       name: "John Doe",
//       raffleName: "Mega Giveaway",
//       merchantName: "Tech Corp",
//       prize: "iPhone 14 Pro",
//       claimUrl: "https://example.com/claim-prize",
//       contactEmail: "support@techcorp.com",
//     });

//     // Send the winner email
//     await sendEmail(
//       "kavita@antheminfotech.com",
//       "🎉 Congratulations! You won the raffle!",
//       winnerEmailContent
//     );
//     console.log("📧 Demo winner email sent!");

//     // Generate dynamic content for the merchant email
//     const merchantEmailContent = generateRaffleResultsEmail({
//       name: "Jane Smith",
//       businessName: "Tech Corp",
//       raffleName: "Mega Giveaway",
//       dashboardUrl: "https://example.com/dashboard",
//       totalEntries: 500,
//       viewsToEntryRate: 25,
//       winnerName: "John Doe",
//       winnerEmail: "winner@example.com",
//       demographicData: {
//         topLocation: "New York",
//         topLocationPercentage: 40,
//         topDevice: "Mobile",
//         topDevicePercentage: 60,
//         topReferrer: "Google",
//         topReferrerPercentage: 50,
//       },
//       previousRaffleEntries: 400,
//       createNewRaffleUrl: "https://example.com/create-raffle",
//     });

//     // Send the merchant email
//     await sendEmail(
//       "neeraj@antheminfotech.in",
//       "🏆 Raffle Results Summary",
//       merchantEmailContent
//     );
//     console.log("📧 Demo merchant email sent!");
//   } catch (error) {
//     console.error("❌ Error sending demo emails:", error);
//   }
// }
