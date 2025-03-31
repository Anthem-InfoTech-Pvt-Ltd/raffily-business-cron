interface EntryConfirmationEmailProps {
  name: string;
  raffleName: string;
  merchantName: string;
  endDate: string;
  viewEntryUrl: string;
  entryId: string;
  prize: string;
}

export const generateEntryConfirmationEmail = ({
  name,
  raffleName,
  merchantName,
  endDate,
  viewEntryUrl,
  entryId,
  prize,
}: EntryConfirmationEmailProps): string => {
  const formattedDate = new Date(endDate).toLocaleDateString("en-US", {
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
      <title>Entry Confirmation</title>
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
          <h1>Entry Confirmation</h1>
        </div>
        <div class="hero">
          <div class="hero-icon">🎟️</div>
          <h2 class="heading">Entry Confirmed!</h2>
          <p class="text">You're officially entered to win the ${raffleName}</p>
        </div>
        <p class="text">Hi ${name},</p>
        <p class="text">
          Great news! Your entry for the <strong>${raffleName}</strong> by <strong>${merchantName}</strong> has been
          successfully recorded. You're now in the running to win:
        </p>
        <div class="hero">
          <h3 class="heading">${prize}</h3>
          <p class="text">Drawing will take place on <strong>${formattedDate}</strong></p>
        </div>
        <p class="text"><strong>Your Entry ID:</strong> ${entryId}</p>
        <p class="text">
          We'll notify you by email after the drawing if you're the lucky winner. In the meantime, you can view your entry
          details by clicking the button below.
        </p>
        <div style="text-align: center;">
          <a href="${viewEntryUrl}" class="button">View My Entry</a>
        </div>
        <div class="divider"></div>
        <p class="text footer">
          If you have any questions about your entry or the raffle, please contact ${merchantName} directly or reply to
          this email.
        </p>
        <p class="text footer">Good luck! 🍀</p>
      </div>
    </body>
    </html>
  `;
};

