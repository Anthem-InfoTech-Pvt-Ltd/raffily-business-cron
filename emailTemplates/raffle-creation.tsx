import type * as React from "react";

interface RaffleCreationEmailProps {
  name: string;
  businessName: string;
  raffleName: string;
  raffleUrl: string;
  dashboardUrl: string;
  startDate: string;
  endDate: string;
  prize: string;
  status: string; // Add status to the props
}

export const RaffleCreationEmail = ({
  name,
  businessName,
  raffleName,
  raffleUrl,
  dashboardUrl,
  startDate,
  endDate,
  prize,
  status, // Include status
}: RaffleCreationEmailProps): string => {
  const formattedStartDate = new Date(startDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedEndDate = new Date(endDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const instructions =
    status === "pending"
      ? `Your raffle is currently in <strong>pending mode</strong>. It will be launched once it is approved by the admin.`
      : `Your raffle is currently in <strong>draft mode</strong>. To make it live and start accepting entries, you'll need to review and publish it from your dashboard.`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 16px;
          }
          .hero {
            text-align: center;
            background-color: #f0f4ff;
            padding: 32px;
            border-radius: 8px;
            margin-bottom: 32px;
          }
          .hero-icon {
            background-color: #fff;
            border-radius: 50%;
            width: 64px;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .hero-heading {
            color: #0056b3;
            font-size: 24px;
            margin: 16px 0;
          }
          .section {
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 24px;
            margin-bottom: 24px;
            border-radius: 8px;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            text-decoration: none;
            color: #fff;
            background-color: #0056b3;
            border-radius: 4px;
            text-align: center;
            margin: 8px 0;
          }
          .button-outline {
            background-color: #fff;
            color: #0056b3;
            border: 1px solid #0056b3;
          }
          .small-text {
            font-size: 12px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="hero">
            <div class="hero-icon">🎁</div>
            <h1 class="hero-heading">Raffle Created!</h1>
            <p>Your raffle "${raffleName}" is ready to go</p>
          </div>

          <p>Hi ${name},</p>
          <p>
            Great news! Your raffle <strong>"${raffleName}"</strong> has been successfully created and is ready to be
            launched. Here's a summary of your raffle details:
          </p>

          <div class="section">
            <table style="width: 100%; border-collapse: collapse;">
              <tbody>
                <tr>
                  <td style="padding: 8px 0; color: #888;">Business:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${businessName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888;">Raffle Name:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${raffleName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888;">Prize:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${prize}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888;">Start Date:</td>
                  <td style="padding: 8px 0;">${formattedStartDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888;">End Date:</td>
                  <td style="padding: 8px 0;">${formattedEndDate}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>${instructions}</p>

          <div style="text-align: center;">
            <a href="${dashboardUrl}" class="button">Manage Raffle</a>
            <a href="${raffleUrl}" class="button button-outline">Preview Raffle</a>
          </div>

          <h3>Next Steps:</h3>
          <ol>
            <li><strong>Review your raffle</strong> to make sure all details are correct</li>
            <li><strong>Publish your raffle</strong> when you're ready to start accepting entries</li>
            <li><strong>Share your raffle</strong> on social media and with your customers</li>
          </ol>

          <p class="small-text">
            If you have any questions or need to make changes to your raffle, you can do so from your dashboard or by
            contacting our support team at <a href="mailto:support@raffily.com">support@raffily.com</a>.
          </p>
          <p class="small-text">We're excited to see your raffle in action! 🎉</p>
        </div>
      </body>
    </html>
  `;
};

export default RaffleCreationEmail;

