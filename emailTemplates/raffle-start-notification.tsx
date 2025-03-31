interface Prize {
  name: string
  description?: string
  imageUrl?: string
}

interface RaffleStartNotificationProps {
  merchantName: string
  merchantLogo?: string
  primaryColor?: string
  raffleName: string
  raffleDescription?: string
  raffleEndDate: string
  raffleUrl: string
  topPrizes?: Prize[]
  recipientName?: string
}

export const generateRaffleStartNotification = ({
  merchantName,
  merchantLogo,
  primaryColor = "#111827",
  raffleName,
  raffleDescription,
  raffleEndDate,
  raffleUrl,
  topPrizes = [],
  recipientName,
}: RaffleStartNotificationProps): string => {
  const baseUrl = "https://www.raffilybusiness.com"

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #374151;">
      <div style="text-align: center; margin-bottom: 24px;">
        ${merchantLogo ? `<img src="${merchantLogo}" alt="${merchantName}" style="max-width: 150px; margin-bottom: 16px;" />` : ""}
        <h1 style="font-size: 24px; font-weight: bold; color: ${primaryColor}; margin: 0;">New Raffle Announcement</h1>
      </div>

      ${recipientName ? `<p style="font-size: 16px; color: #374151; margin-bottom: 16px;">Hello ${recipientName},</p>` : ""}

      <p style="font-size: 16px; line-height: 24px; color: #374151; margin-bottom: 16px;">
        We're excited to announce our newest raffle: <strong>${raffleName}</strong>!
      </p>

      ${raffleDescription ? `<p style="font-size: 16px; line-height: 24px; color: #374151; margin-bottom: 16px;">${raffleDescription}</p>` : ""}

      <div style="background-color: #f9fafb; border-radius: 6px; padding: 16px; margin-top: 16px; margin-bottom: 24px;">
        <p style="font-size: 14px; color: #6B7280; margin-bottom: 4px;">Entry Deadline:</p>
        <p style="font-size: 16px; font-weight: bold; color: #111827; margin: 0;">${raffleEndDate}</p>
      </div>

      ${topPrizes.length > 0
      ? `
        <div style="margin-top: 24px; margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: bold; color: #111827; margin-bottom: 16px;">Top Prizes</h2>
          ${topPrizes
        .map(
          (prize) => `
            <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
              ${prize.imageUrl
              ? `<div style="width: 80px; margin-right: 16px;">
                      <img src="${prize.imageUrl.startsWith("http") ? prize.imageUrl : `${baseUrl}${prize.imageUrl}`}" alt="${prize.name}" style="width: 80px; height: 80px; border-radius: 4px;" />
                    </div>`
              : ""
            }
              <div>
                <p style="font-size: 16px; font-weight: bold; color: #111827; margin: 0 0 4px 0;">${prize.name}</p>
                ${prize.description ? `<p style="font-size: 14px; color: #6B7280; margin: 0;">${prize.description}</p>` : ""}
              </div>
            </div>
          `
        )
        .join("")}
        </div>
      `
      : ""
    }

      <div style="text-align: center; margin-top: 24px; margin-bottom: 24px;">
        <p style="font-size: 16px; color: #374151; margin-bottom: 16px;">Don't miss your chance to win! Enter the raffle now:</p>
        <a href="${raffleUrl}" style="display: inline-block; padding: 12px 24px; background-color: ${primaryColor}; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px;">Enter Raffle Now</a>
      </div>

      <p style="font-size: 16px; color: #374151; margin-bottom: 16px;">Good luck!</p>

      <p style="font-size: 16px; color: #374151; margin-top: 24px;">The ${merchantName} Team</p>
    </div>
  `
}

export default generateRaffleStartNotification

