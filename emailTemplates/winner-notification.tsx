interface WinnerNotificationProps {
  merchantName: string
  merchantLogo?: string
  primaryColor?: string
  winnerName: string
  raffleName: string
  prizeName: string
  prizeDescription?: string
  prizeValue?: string
  claimUrl: string
  claimDeadline?: string
}

export const generateWinnerNotificationEmail = ({
  merchantName,
  merchantLogo,
  primaryColor = "#111827",
  winnerName,
  raffleName,
  prizeName,
  prizeDescription,
  prizeValue,
  claimUrl,
  claimDeadline,
}: WinnerNotificationProps): string => {
  const baseUrl = "https://raffily.com"

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #374151;">
      <div style="text-align: center; margin-bottom: 32px;">
        <img src="${baseUrl}/images/celebration.png" alt="Celebration" width="120" height="120" style="margin: 0 auto;" />
        <h1 style="font-size: 28px; font-weight: bold; color: ${primaryColor}; margin-bottom: 8px;">Congratulations, ${winnerName}!</h1>
        <p style="font-size: 24px; font-weight: bold; color: #10B981; margin-bottom: 24px;">You're a WINNER!</p>
      </div>

      <p style="font-size: 16px; line-height: 24px; margin-bottom: 16px;">
        We're thrilled to inform you that you've won the <strong>${raffleName}</strong> raffle!
      </p>

      <div style="background-color: #f9fafb; border-radius: 6px; padding: 16px; margin-top: 24px; margin-bottom: 24px;">
        <h2 style="font-size: 18px; font-weight: bold; color: #111827; margin-bottom: 12px;">Your Prize:</h2>
        <p style="font-size: 20px; font-weight: bold; color: #4F46E5; margin-bottom: 8px;">${prizeName}</p>
        ${prizeDescription ? `<p style="font-size: 16px; color: #374151; margin-bottom: 8px;">${prizeDescription}</p>` : ""}
        ${prizeValue ? `<p style="font-size: 16px; font-weight: bold; color: #111827; margin-top: 8px;">Value: ${prizeValue}</p>` : ""}
      </div>

      <div style="text-align: center; margin-top: 24px; margin-bottom: 24px;">
        <p style="font-size: 16px; color: #374151; margin-bottom: 16px;">To claim your prize, please click the button below:</p>
        <a href="${claimUrl}" style="display: inline-block; padding: 12px 24px; background-color: ${primaryColor}; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px;">
          Claim Your Prize
        </a>
        ${claimDeadline
      ? `<p style="font-size: 14px; color: #6B7280; margin-top: 12px;">Please claim your prize by <strong>${claimDeadline}</strong></p>`
      : ""
    }
      </div>

      <p style="font-size: 16px; line-height: 24px; margin-bottom: 16px;">
        If you have any questions about your prize or how to claim it, please contact us directly by replying to this email.
      </p>

      <p style="font-size: 16px; color: #374151; margin-top: 24px;">
        Congratulations again!
        <br />
        The ${merchantName} Team
      </p>
    </div>
  `
}

export default generateWinnerNotificationEmail

