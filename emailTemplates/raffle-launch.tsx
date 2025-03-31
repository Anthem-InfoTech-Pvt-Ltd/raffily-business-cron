interface RaffleLaunchEmailProps {
  name: string;
  raffleName: string;
  raffleUrl: string;
  dashboardUrl: string;
  endDate: string;
  prize: string;
  socialShareUrl: string;
  status: "active" | "SCHEDULED" | "Reject";
  reason?: string;
}

export const generateRaffleLaunchEmail = ({
  name,
  raffleName,
  raffleUrl,
  dashboardUrl,
  endDate,
  prize,
  socialShareUrl,
  status,
  reason,
}: RaffleLaunchEmailProps): string => {
  const formattedEndDate = new Date(endDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const statusMessages: Record<typeof status, { title: string; message: string }> = {
    active: {
      title: "Your Raffle is Now Active!",
      message: `Your raffle "${raffleName}" is now live and accepting entries. Share the link below to start promoting.`,
    },
    SCHEDULED: {
      title: "Your Raffle is Scheduled!",
      message: `Your raffle "${raffleName}" has been scheduled. It will automatically go live on the specified start date.`,
    },
    Reject: {
      title: "Your Raffle Submission Was Rejected",
      message: `Unfortunately, your raffle "${raffleName}" was rejected. Reason: ${reason || "No reason provided."}`,
    },
  };

  const { title, message } = statusMessages[status];

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
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
          }
          .header {
            text-align: center;
            background-color: #4caf50;
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 10px 0;
            color: white;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 4px;
          }
          .footer {
            font-size: 12px;
            color: #777;
            text-align: center;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${title}</h1>
          </div>
          <p>Hi ${name},</p>
          <p>${message}</p>
          ${status === "active"
      ? `
            <p><strong>Your Public Raffle URL:</strong></p>
            <p><a href="${raffleUrl}" class="button">${raffleUrl}</a></p>
          `
      : ""
    }
          <p>Your raffle will be accepting entries until <strong>${formattedEndDate}</strong>.</p>
          <p>You can monitor entries and performance in real-time from your dashboard:</p>
          <p><a href="${dashboardUrl}" class="button">View Dashboard</a></p>
          ${status === "active"
      ? `<p>Share your raffle on social media:</p>
                 <p><a href="${socialShareUrl}" class="button">Social Media Kit</a></p>`
      : ""
    }
          <div class="footer">
            <p>If you have any questions, please contact our support team at <a href="mailto:support@raffily.com">support@raffily.com</a>.</p>
            <p>Good luck with your raffle! 🍀</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

