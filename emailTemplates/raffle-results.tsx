import { colors } from "./components/theme";

/**
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.businessName
 * @param {string} props.raffleName
 * @param {string} props.dashboardUrl
 * @param {number} props.totalEntries
 * @param {number} props.viewsToEntryRate
 * @param {string} props.winnerName
 * @param {string} props.winnerEmail
 * @param {Object} props.demographicData
 * @param {string} props.demographicData.topLocation
 * @param {number} props.demographicData.topLocationPercentage
 * @param {string} props.demographicData.topDevice
 * @param {number} props.demographicData.topDevicePercentage
 * @param {string} props.demographicData.topReferrer
 * @param {number} props.demographicData.topReferrerPercentage
 * @param {number} [props.previousRaffleEntries]
 * @param {string} props.createNewRaffleUrl
 */
const generateRaffleResultsEmail = (props) => {
  const {
    name,
    businessName,
    raffleName,
    dashboardUrl,
    totalEntries,
    viewsToEntryRate,
    winnerName,
    winnerEmail,
    demographicData,
    previousRaffleEntries,
    createNewRaffleUrl,
  } = props;

  const hasGrowth = previousRaffleEntries !== undefined;
  const growthPercentage = hasGrowth
    ? Math.round(((totalEntries - previousRaffleEntries) / previousRaffleEntries) * 100)
    : 0;
  const isPositiveGrowth = growthPercentage >= 0;

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: ${colors.mediumGray};">
      <div style="background-color: ${colors.primaryLight}; padding: 32px; border-radius: 8px; text-align: center; margin-bottom: 32px;">
        <div style="background-color: ${colors.white}; border-radius: 50%; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="font-size: 32px; line-height: 1;">🏆</div>
        </div>
        <h1 style="color: ${colors.primary}; margin: 0;">Raffle Results</h1>
        <p style="font-size: 18px; margin: 8px 0;">"${raffleName}" has successfully concluded</p>
      </div>

      <p>Hi ${name},</p>
      <p>Great news! Your raffle <strong>"${raffleName}"</strong> has successfully concluded. Here's a comprehensive summary of your results:</p>

      <h3>Key Performance Metrics:</h3>
      <div style="display: flex; gap: 16px; margin-bottom: 24px;">
        <div style="flex: 1; text-align: center; padding: 16px; background-color: ${colors.white}; border: 1px solid ${colors.lightGray}; border-radius: 8px;">
          <p style="margin: 0; font-weight: bold; color: ${colors.primary};">${totalEntries}</p>
          <p style="margin: 0; color: ${colors.mediumGray};">Total Entries</p>
        </div>
        <div style="flex: 1; text-align: center; padding: 16px; background-color: ${colors.white}; border: 1px solid ${colors.lightGray}; border-radius: 8px;">
          <p style="margin: 0; font-weight: bold; color: ${colors.secondary};">${viewsToEntryRate}%</p>
          <p style="margin: 0; color: ${colors.mediumGray};">Conversion Rate</p>
        </div>
        ${hasGrowth
      ? `<div style="flex: 1; text-align: center; padding: 16px; background-color: ${colors.white}; border: 1px solid ${colors.lightGray}; border-radius: 8px;">
                <p style="margin: 0; font-weight: bold; color: ${isPositiveGrowth ? colors.success : colors.danger
      };">${isPositiveGrowth ? "+" : ""}${growthPercentage}%</p>
                <p style="margin: 0; color: ${colors.mediumGray};">Growth</p>
              </div>`
      : ""
    }
      </div>

      <div style="background-color: ${colors.white}; border: 1px solid ${colors.lightGray}; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
        <h3 style="color: ${colors.primary}; text-align: center; margin: 0 0 16px 0;">Winner Information</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            <tr>
              <td style="padding: 8px 0; vertical-align: top; width: 120px; color: ${colors.mediumGray};">Name:</td>
              <td style="padding: 8px 0; vertical-align: top; font-weight: bold;">${winnerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top; width: 120px; color: ${colors.mediumGray};">Email:</td>
              <td style="padding: 8px 0; vertical-align: top;">
                <a href="mailto:${winnerEmail}" style="color: ${colors.secondary}; text-decoration: none;">${winnerEmail}</a>
              </td>
            </tr>
          </tbody>
        </table>
        <p style="font-size: 12px; text-align: center; margin: 16px 0 0 0;">The winner has been automatically notified via email.</p>
      </div>

      <h3>Participant Demographics:</h3>
      <div style="display: flex; gap: 16px; margin-bottom: 16px;">
        <div style="flex: 1; background-color: ${colors.white}; border: 1px solid ${colors.lightGray}; border-radius: 8px; padding: 16px;">
          <p style="margin: 0 0 8px 0; font-weight: bold;">Top Location</p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <p style="margin: 0;">${demographicData.topLocation}</p>
            <p style="margin: 0; font-weight: bold; color: ${colors.primary};">${demographicData.topLocationPercentage}%</p>
          </div>
        </div>
        <div style="flex: 1; background-color: ${colors.white}; border: 1px solid ${colors.lightGray}; border-radius: 8px; padding: 16px;">
          <p style="margin: 0 0 8px 0; font-weight: bold;">Top Device</p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <p style="margin: 0;">${demographicData.topDevice}</p>
            <p style="margin: 0; font-weight: bold; color: ${colors.primary};">${demographicData.topDevicePercentage}%</p>
          </div>
        </div>
      </div>
      <div style="background-color: ${colors.white}; border: 1px solid ${colors.lightGray}; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <p style="margin: 0 0 8px 0; font-weight: bold;">Top Traffic Source</p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <p style="margin: 0;">${demographicData.topReferrer}</p>
          <p style="margin: 0; font-weight: bold; color: ${colors.primary};">${demographicData.topReferrerPercentage}%</p>
        </div>
      </div>

      <div style="text-align: center; margin-bottom: 24px;">
        <a href="${dashboardUrl}" style="display: inline-block; padding: 12px 24px; background-color: ${colors.primary}; color: ${colors.white}; text-decoration: none; border-radius: 4px;">View Detailed Analytics</a>
      </div>

      <hr style="border: none; border-top: 1px solid ${colors.lightGray}; margin: 24px 0;" />

      <h3>Next Steps:</h3>
      <div style="margin-bottom: 24px;">
        <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
          <div style="font-size: 24px; line-height: 1; margin-right: 12px; margin-top: 2px;">📞</div>
          <div>
            <p style="margin: 0 0 4px 0; font-weight: bold;">Contact the Winner</p>
            <p style="margin: 0; font-size: 12px;">The winner has been automatically notified, but you may want to personally reach out to coordinate prize delivery.</p>
          </div>
        </div>
        <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
          <div style="font-size: 24px; line-height: 1; margin-right: 12px; margin-top: 2px;">📊</div>
          <div>
            <p style="margin: 0 0 4px 0; font-weight: bold;">Review Your Analytics</p>
            <p style="margin: 0; font-size: 12px;">Dive deeper into your raffle performance to gain insights for future campaigns.</p>
          </div>
        </div>
        <div style="display: flex; align-items: flex-start;">
          <div style="font-size: 24px; line-height: 1; margin-right: 12px; margin-top: 2px;">🎯</div>
          <div>
            <p style="margin: 0 0 4px 0; font-weight: bold;">Plan Your Next Raffle</p>
            <p style="margin: 0; font-size: 12px;">Keep the momentum going by planning your next raffle campaign.</p>
          </div>
        </div>
      </div>

      <div style="text-align: center;">
        <a href="${createNewRaffleUrl}" style="display: inline-block; padding: 12px 24px; background-color: ${colors.secondary}; color: ${colors.white}; text-decoration: none; border-radius: 4px;">Create a New Raffle</a>
      </div>

      <p style="font-size: 12px; color: ${colors.mediumGray}; margin-top: 24px;">Thank you for using Raffily for your raffle campaign. We hope it was a success for your business!</p>
      <p style="font-size: 12px; color: ${colors.mediumGray}; margin-bottom: 0;">If you have any questions or need assistance with your next raffle, please contact our support team at <a href="mailto:support@raffily.com" style="color: ${colors.primary};">support@raffily.com</a>.</p>
    </div>
  `;
};

module.exports = generateRaffleResultsEmail;

