import type React from "react";
import ReactDOMServer from "react-dom/server";

interface TicketDetailsProps {
  ticketNumber: string;
  purchaseDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  raffleName: string;
  raffleEndDate: string;
  answers?: Record<string, string> | null;
}

export const generateTicketDetailsEmail = ({
  ticketNumber,
  purchaseDate,
  customerName,
  customerEmail,
  customerPhone = "Not provided",
  raffleName,
  raffleEndDate,
  answers,
}: TicketDetailsProps): string => {
  const formattedEndDate = new Date(raffleEndDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const additionalInfo = answers
    ? Object.entries(answers)
      .map(
        ([question, answer]) => `
          <div class="row">
            <div class="label-column">
              <div class="label">${question}:</div>
            </div>
            <div class="value">${answer}</div>
          </div>
        `
      )
      .join("")
    : "";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ticket Details</title>
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
        .heading {
          font-size: 18px;
          font-weight: bold;
          color: #111827;
          margin-bottom: 12px;
        }
        .label {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 8px;
        }
        .value {
          font-size: 14px;
          color: #111827;
          margin-bottom: 8px;
        }
        .row {
          display: flex;
          margin-bottom: 8px;
        }
        .label-column {
          width: 40%;
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
          <h1>Ticket Details</h1>
        </div>
        <div class="heading">Ticket Information</div>
        <div class="row">
          <div class="label-column">
            <div class="label">Ticket Number:</div>
          </div>
          <div class="value">${ticketNumber}</div>
        </div>
        <div class="row">
          <div class="label-column">
            <div class="label">Purchase Date:</div>
          </div>
          <div class="value">${purchaseDate}</div>
        </div>
        <div class="row">
          <div class="label-column">
            <div class="label">Raffle:</div>
          </div>
          <div class="value">${raffleName}</div>
        </div>
        <div class="row">
          <div class="label-column">
            <div class="label">Draw Date:</div>
          </div>
          <div class="value">${formattedEndDate}</div>
        </div>
        <div class="heading">Customer Information</div>
        <div class="row">
          <div class="label-column">
            <div class="label">Name:</div>
          </div>
          <div class="value">${customerName}</div>
        </div>
        <div class="row">
          <div class="label-column">
            <div class="label">Email:</div>
          </div>
          <div class="value">${customerEmail}</div>
        </div>
        <div class="row">
          <div class="label-column">
            <div class="label">Phone:</div>
          </div>
          <div class="value">${customerPhone}</div>
        </div>
        ${additionalInfo
      ? `
          <div class="heading">Additional Information</div>
          ${additionalInfo}
        `
      : ""
    }
        <div class="footer">
          <p>If you have any questions, please contact our support team at <a href="mailto:support@raffily.com">support@raffily.com</a>.</p>
          <p>Thank you for participating in the raffle!</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

