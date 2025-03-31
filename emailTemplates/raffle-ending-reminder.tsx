interface RaffleEndingReminderProps {
  merchantName: string;
  merchantLogo?: string;
  primaryColor?: string;
  raffleName: string;
  hoursRemaining: number;
  endDate: string;
  raffleUrl: string;
  recipientName?: string;
}

export const generateRaffleEndingReminderEmail = ({
  merchantName,
  merchantLogo,
  primaryColor = "#4caf50",
  raffleName,
  hoursRemaining,
  endDate,
  raffleUrl,
  recipientName,
}: RaffleEndingReminderProps): string => {
  const isUrgent = hoursRemaining <= 24;
  const isVeryUrgent = hoursRemaining <= 6;

  let headingText = `Don't Miss Out: ${raffleName} Raffle Ending Soon`;
  let previewText = `The ${raffleName} raffle is ending soon - Enter now!`;

  if (isVeryUrgent) {
    headingText = `LAST CHANCE: ${raffleName} Raffle Ends in ${hoursRemaining} Hours!`;
    previewText = `URGENT: Only ${hoursRemaining} hours left to enter the ${raffleName} raffle!`;
  } else if (isUrgent) {
    headingText = `Hurry: ${raffleName} Raffle Ends in ${hoursRemaining} Hours!`;
    previewText = `Only ${hoursRemaining} hours left to enter the ${raffleName} raffle!`;
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${headingText}</title>
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
          background-color: ${primaryColor};
          color: white;
          padding: 20px;
          border-radius: 8px 8px 0 0;
        }
        .heading {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 24px;
          text-align: center;
          color: ${isVeryUrgent ? "#DC2626" : isUrgent ? "#F59E0B" : "#111827"};
        }
        .text {
          font-size: 16px;
          line-height: 24px;
          color: #374151;
          margin-bottom: 16px;
        }
        .time-remaining {
          text-align: center;
          padding: 16px;
          margin: 16px 0 24px;
          border-radius: 6px;
          background-color: ${isVeryUrgent ? "#FEE2E2" : isUrgent ? "#FEF3C7" : "#F9FAFB"};
          border: 1px solid ${isVeryUrgent ? "#DC2626" : isUrgent ? "#F59E0B" : "#E5E7EB"};
        }
        .time-remaining strong {
          font-size: 18px;
          font-weight: bold;
          color: ${isVeryUrgent ? "#DC2626" : isUrgent ? "#B45309" : "#111827"};
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          margin: 10px 0;
          color: white;
          background-color: ${isVeryUrgent ? "#DC2626" : isUrgent ? "#F59E0B" : primaryColor};
          text-decoration: none;
          border-radius: 4px;
          text-align: center;
        }
        .footer {
          font-size: 16px;
          color: #374151;
          margin-top: 24px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${merchantName}</h1>
        </div>
        <h2 class="heading">${headingText}</h2>
        ${recipientName ? `<p class="text">Hello ${recipientName},</p>` : ""}
        <p class="text">
          This is a friendly reminder that the <strong>${raffleName}</strong> raffle is ending soon.
        </p>
        <div class="time-remaining">
          <p><strong>Time Remaining: ${hoursRemaining} hours</strong></p>
          <p>Raffle ends on: ${endDate}</p>
        </div>
        <p class="text">You haven't entered this raffle yet. Don't miss your chance to win!</p>
        <div style="text-align: center;">
          <a href="${raffleUrl}" class="button">Enter Raffle Now</a>
        </div>
        <p class="footer">
          Good luck!<br />
          The ${merchantName} Team
        </p>
      </div>
    </body>
    </html>
  `;
};

