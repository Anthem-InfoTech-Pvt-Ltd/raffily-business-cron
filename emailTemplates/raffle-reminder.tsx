interface RaffleReminderEmailProps {
  name: string;
  raffleName: string;
  merchantName: string;
  drawingDate: string;
  prize: string;
  viewEntryUrl: string;
  shareUrl: string;
  hoursLeft: number;
}

export const generateRaffleReminderEmail = ({
  name,
  raffleName,
  merchantName,
  drawingDate,
  prize,
  viewEntryUrl,
  shareUrl,
  hoursLeft,
}: RaffleReminderEmailProps): string => {
  const formattedDate = new Date(drawingDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${raffleName} Reminder</title>
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
          font-size: 24px;
          font-weight: bold;
          color: #111827;
          margin-bottom: 12px;
        }
        .text {
          font-size: 16px;
          line-height: 24px;
          color: #374151;
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
          <h1>${raffleName} Reminder</h1>
        </div>
        <div class="hero">
          <div class="hero-icon">⏰</div>
          <h2 class="heading">${hoursLeft} Hours Left!</h2>
          <p class="text">The ${raffleName} drawing is happening soon</p>
        </div>
        <p class="text">Hi ${name},</p>
        <p class="text">
          This is a friendly reminder that the drawing for <strong>${raffleName}</strong> by <strong>${merchantName}</strong> is happening in just <strong>${hoursLeft} hours</strong>!
        </p>
        <div class="hero">
          <h3 class="heading">${prize}</h3>
          <p class="text">Drawing: <strong>${formattedDate}</strong></p>
        </div>
        <p class="text">
          We're excited to announce the winner soon! Remember, you're already entered in the drawing, so there's nothing more you need to do.
        </p>
        <div style="display: flex; justify-content: space-around; margin-top: 24px;">
          <a href="${viewEntryUrl}" class="button">View My Entry</a>
          <a href="${shareUrl}" class="button" style="background-color: #6c757d;">Share With Friends</a>
        </div>
        <div class="divider"></div>
        <p class="footer">
          Want to increase your chances in future raffles? Keep an eye out for new opportunities from ${merchantName} and other businesses on Raffily.
        </p>
        <p class="footer">Good luck! 🍀</p>
      </div>
    </body>
    </html>
  `;
};

