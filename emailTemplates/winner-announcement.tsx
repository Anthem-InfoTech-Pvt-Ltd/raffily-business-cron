interface WinnerAnnouncementEmailProps {
  name: string
  raffleName: string
  merchantName: string
  prize: string
  claimUrl: string
  claimDeadline: string
  contactEmail: string
}

export const generateWinnerAnnouncementEmail = ({
  name,
  raffleName,
  merchantName,
  prize,
  claimUrl,
  claimDeadline,
  contactEmail,
}: WinnerAnnouncementEmailProps): string => {
  const formattedDeadline = new Date(claimDeadline).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333;">
      <div style="background-color: #f3f4f6; padding: 32px; border-radius: 8px; text-align: center; margin-bottom: 32px;">
        <div style="background-color: #ffffff; border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="font-size: 40px; line-height: 1;">🏆</div>
        </div>
        <h1 style="font-size: 24px; font-weight: bold; color: #111827; margin: 0;">YOU WON!</h1>
        <p style="font-size: 18px; color: #111827; margin: 8px 0;">Congratulations on winning the ${raffleName}!</p>
      </div>

      <p style="font-size: 16px; line-height: 24px; margin: 16px 0;">Hi ${name},</p>

      <p style="font-size: 16px; line-height: 24px; margin: 16px 0;">
        Amazing news! You've been selected as the winner of the <strong>${raffleName}</strong> by 
        <strong>${merchantName}</strong>. Congratulations!
      </p>

      <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 24px; margin-bottom: 24px; text-align: center;">
        <h2 style="font-size: 20px; font-weight: bold; color: #1d4ed8; margin: 0 0 16px 0;">Your Prize: ${prize}</h2>
        <p style="font-size: 16px; font-weight: bold; margin: 0;">You must claim your prize by <strong>${formattedDeadline}</strong></p>
      </div>

      <p style="font-size: 16px; line-height: 24px; margin: 16px 0;">
        To claim your prize, please click the button below. This will take you to a secure form where you can provide your shipping information and any other details needed to deliver your prize.
      </p>

      <div style="text-align: center; margin: 24px 0;">
        <a href="${claimUrl}" style="display: inline-block; padding: 12px 24px; background-color: #1d4ed8; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px;">
          Claim My Prize Now
        </a>
      </div>

      <p style="font-size: 16px; line-height: 24px; margin: 16px 0;">
        If you have any questions about your prize or how to claim it, please contact ${merchantName} directly at 
        <a href="mailto:${contactEmail}" style="color: #1d4ed8; text-decoration: none;">${contactEmail}</a>.
      </p>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

      <p style="font-size: 14px; line-height: 22px; color: #6b7280; margin: 0;">
        <strong>Important:</strong> You must claim your prize by ${formattedDeadline}. If the prize is not claimed by this date, it may be awarded to an alternate winner.
      </p>

      <p style="font-size: 14px; line-height: 22px; color: #6b7280; margin: 16px 0 0 0;">Congratulations again on your win! 🎉</p>
    </div>
  `
}

export default generateWinnerAnnouncementEmail

