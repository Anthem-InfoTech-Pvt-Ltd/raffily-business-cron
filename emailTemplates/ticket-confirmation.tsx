interface TicketConfirmationProps {
  merchantName: string
  merchantLogo?: string
  primaryColor?: string
  ticketNumber: string
  purchaseDate: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  raffleName: string
  raffleEndDate: string
  raffleUrl: string
  answers?: Record<string, string> | null
}

export const generateTicketConfirmationEmail = ({
  merchantName,
  merchantLogo,
  primaryColor = "#111827",
  ticketNumber,
  purchaseDate,
  customerName,
  customerEmail,
  customerPhone,
  raffleName,
  raffleEndDate,
  raffleUrl,
  answers,
}: TicketConfirmationProps): string => {
  const answersHtml = answers
    ? Object.entries(answers)
      .map(
        ([question, answer]) => `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-size: 14px; color: #374151;">${question}</td>
            <td style="padding: 8px; border: 1px solid #ddd; font-size: 14px; color: #374151;">${answer}</td>
          </tr>
        `
      )
      .join("")
    : ""

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #374151;">
      <div style="text-align: center; margin-bottom: 24px;">
        ${merchantLogo ? `<img src="${merchantLogo}" alt="${merchantName}" style="max-width: 150px; margin-bottom: 16px;" />` : ""}
        <h1 style="font-size: 24px; font-weight: bold; color: ${primaryColor}; margin: 0;">Your Raffle Entry is Confirmed!</h1>
      </div>

      <p style="font-size: 16px; line-height: 24px; margin-bottom: 16px;">
        Thank you for entering the <strong>${raffleName}</strong> raffle. Your entry has been successfully registered.
      </p>

      <p style="font-size: 16px; line-height: 24px; margin-bottom: 16px;">
        Please keep this email as confirmation of your entry. The raffle draw will take place on ${raffleEndDate}.
      </p>

      <div style="background-color: #f9fafb; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
        <h2 style="font-size: 18px; font-weight: bold; color: #111827; margin-bottom: 16px;">Ticket Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-size: 14px; color: #374151;">Ticket Number:</td>
            <td style="padding: 8px; border: 1px solid #ddd; font-size: 14px; color: #111827; font-weight: bold;">${ticketNumber}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-size: 14px; color: #374151;">Purchase Date:</td>
            <td style="padding: 8px; border: 1px solid #ddd; font-size: 14px; color: #111827;">${purchaseDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-size: 14px; color: #374151;">Customer Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd; font-size: 14px; color: #111827;">${customerName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-size: 14px; color: #374151;">Customer Email:</td>
            <td style="padding: 8px; border: 1px solid #ddd; font-size: 14px; color: #111827;">${customerEmail}</td>
          </tr>
          ${customerPhone
      ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-size: 14px; color: #374151;">Customer Phone:</td>
            <td style="padding: 8px; border: 1px solid #ddd; font-size: 14px; color: #111827;">${customerPhone}</td>
          </tr>
          `
      : ""
    }
        </table>

        ${answersHtml
      ? `
        <h3 style="font-size: 16px; font-weight: bold; color: #111827; margin-bottom: 8px;">Your Answers:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          ${answersHtml}
        </table>
        `
      : ""
    }
      </div>

      <div style="text-align: center; margin-top: 24px; margin-bottom: 24px;">
        <p style="font-size: 16px; color: #374151; margin-bottom: 16px;">
          You can view your ticket and raffle details at any time by clicking the button below:
        </p>
        <a href="${raffleUrl}" style="display: inline-block; padding: 12px 24px; background-color: ${primaryColor}; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px;">
          View Your Ticket
        </a>
      </div>

      <p style="font-size: 16px; color: #374151; margin-bottom: 16px;">Good luck in the draw!</p>

      <p style="font-size: 16px; color: #374151; margin-top: 24px;">The ${merchantName} Team</p>
    </div>
  `
}

export default generateTicketConfirmationEmail

