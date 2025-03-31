interface EntryMilestoneEmailProps {
  name: string;
  raffleName: string;
  milestone: number;
  prize: string;
  raffleEndDate: string;
  viewRaffleUrl: string;
}

export const generateEntryMilestoneEmail = ({
  name,
  raffleName,
  milestone,
  prize,
  raffleEndDate,
  viewRaffleUrl,
}: EntryMilestoneEmailProps): string => {
  const formattedEndDate = new Date(raffleEndDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Milestone Achieved</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f9fafb;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #ffffff;
        }
        .header {
          text-align: center;
          background-color: #4caf50;
          color: white;
          padding: 20px;
          border-radius: 8px 8px 0 0;
        }
        .hero {
          text-align: center;
          padding: 32px;
          background-color: #e8f5e9;
          border-radius: 8px;
          margin-bottom: 32px;
        }
        .hero-icon {
          background-color: #ffffff;
          border-radius: 50%;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          font-size: 32px;
        }
        .heading {
          font-size: 18px;
          font-weight: bold;
          color: #111827;
          margin-bottom: 12px;
        }
        .text {
          font-size: 14px;
          color: #333;
          margin-bottom: 16px;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          margin: 10px 0;
          color: white;
          background-color: #007bff;
          text-decoration: none;
          border-radius: 4px;
          text-align: center;
        }
        .footer {
          font-size: 12px;
          color: #777;
          text-align: center;
          margin-top: 20px;
        }
        .divider {
          border-top: 1px solid #ddd;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Milestone Achieved!</h1>
        </div>
        <div class="hero">
          <div class="hero-icon">🎉</div>
          <h2 class="heading">Congratulations, ${name}!</h2>
          <p class="text">You've reached a milestone of ${milestone} entries for the raffle "${raffleName}".</p>
        </div>
        <p class="text">
          This means you're closer to winning the grand prize:
        </p>
        <div class="hero">
          <h3 class="heading">${prize}</h3>
          <p class="text">The raffle ends on <strong>${formattedEndDate}</strong>.</p>
        </div>
        <p class="text">
          Keep an eye on your email for updates and announcements. You can view the raffle details by clicking the button below.
        </p>
        <div style="text-align: center;">
          <a href="${viewRaffleUrl}" class="button">View Raffle</a>
        </div>
        <div class="divider"></div>
        <p class="text footer">
          If you have any questions, please contact our support team at <a href="mailto:support@raffily.com">support@raffily.com</a>.
        </p>
        <p class="text footer">Good luck! 🍀</p>
      </div>
    </body>
    </html>
  `;
};

