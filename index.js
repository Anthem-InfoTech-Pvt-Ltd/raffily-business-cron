require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cron = require("node-cron");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
const client = new MongoClient(
  "mongodb+srv://ben:2qOXsIvFGqDs3tk6@cluster0.wla45.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
const db = client.db("raffily");
const rafflesCollection = db.collection("raffles");
const entriesCollection = db.collection("entries");
const winnersCollection = db.collection("winners");
const usersCollection = db.collection("users");

// Nodemailer Email Setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "neeraj@antheminfotech.com", // Your email address
    pass: "pcwgfixsrnvingtv", // Your email password or app-specific password
  },
});

// Function to Pick a Random Winner
async function pickWinner(raffleId) {
  const entries = await entriesCollection
    .find({ raffleId: new ObjectId(raffleId) })
    .toArray();

  if (entries.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * entries.length);
  return entries[randomIndex];
}

// Function to Send Emails
async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: "neeraj@antheminfotech.com",
      to,
      subject,
      text,
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
}

// Function to Process Expired Raffles
async function processRaffles() {
  try {
    await client.connect();
    const currentTime = new Date();

    const expiredRaffles = await rafflesCollection
      .find({ status: "active", endDate: { $lte: currentTime } })
      .toArray();

    for (const raffle of expiredRaffles) {
      console.log(`🎉 Processing raffle ${raffle._id}`);

      const winnerEntry = await pickWinner(raffle._id.toString());

      if (winnerEntry) {
        await winnersCollection.insertOne({
          raffleId: raffle._id,
          entryId: winnerEntry._id,
          createdAt: new Date(),
        });

        console.log(`🏆 Winner selected: Entry ${winnerEntry._id}`);

        const merchantUser = await usersCollection.findOne({
          _id: new ObjectId(raffle.merchantId),
        });

        if (winnerEntry?.email) {
          await sendEmail(
            winnerEntry.email,
            "🎉 You won the raffle!",
            `You have won the raffle "${raffle.title}". Your entry ID: ${winnerEntry._id}`
          );
        }

        if (merchantUser?.email) {
          await sendEmail(
            merchantUser.email,
            "🏆 Raffle has ended - Winner Selected",
            `Your raffle "${raffle.title}" has ended. The winner is entry ID: ${winnerEntry._id}`
          );
        }
      } else {
        console.log(`❌ No winner for raffle ${raffle._id} (no entries)`);
      }

      await rafflesCollection.updateOne(
        { _id: raffle._id },
        { $set: { status: "ended" } }
      );

      console.log(`✅ Raffle ${raffle._id} marked as ENDED`);
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
