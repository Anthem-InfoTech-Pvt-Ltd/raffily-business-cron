/**
 * Generates the raffle results email HTML dynamically.
 * @param {Object} props
 * @param {string} props.name - Merchant's name
 * @param {string} props.businessName - Business name
 * @param {string} props.raffleName - Name of the raffle
 * @param {string} props.dashboardUrl - URL to the dashboard
 * @param {number} props.totalEntries - Total number of entries
 * @param {number} props.viewsToEntryRate - Conversion rate
 * @param {string} props.winnerName - Winner's name
 * @param {string} props.winnerEmail - Winner's email
 * @param {Object} props.demographicData - Demographic data
 * @param {string} props.demographicData.topLocation - Top location
 * @param {number} props.demographicData.topLocationPercentage - Percentage of top location
 * @param {string} props.demographicData.topDevice - Top device
 * @param {number} props.demographicData.topDevicePercentage - Percentage of top device
 * @param {string} props.demographicData.topReferrer - Top referrer
 * @param {number} props.demographicData.topReferrerPercentage - Percentage of top referrer
 * @param {number} [props.previousRaffleEntries] - Previous raffle entries (optional)
 * @param {string} props.createNewRaffleUrl - URL to create a new raffle
 * @returns {string} - HTML content for the email
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
    ? Math.round(
        ((totalEntries - previousRaffleEntries) / previousRaffleEntries) * 100
      )
    : 0;
  const isPositiveGrowth = growthPercentage >= 0;

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #666666;">
      <div style="background-color: #f0f8ff; padding: 32px; border-radius: 8px; text-align: center; margin-bottom: 32px;">
        <div style="background-color: #ffffff; border-radius: 50%; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="font-size: 32px; line-height: 1;">🏆</div>
        </div>
        <h1 style="color: #007bff; margin: 0;">Raffle Results</h1>
        <p style="font-size: 18px; margin: 8px 0;">"${raffleName}" has successfully concluded</p>
      </div>

      <p>Hi ${name},</p>
      <p>Great news! Your raffle <strong>"${raffleName}"</strong> has successfully concluded. Here's a comprehensive summary of your results:</p>

      <h3>Key Performance Metrics:</h3>
      <div style="display: flex; gap: 16px; margin-bottom: 24px;">
        <div style="flex: 1; text-align: center; padding: 16px; background-color: #ffffff; border: 1px solid #cccccc; border-radius: 8px;">
          <p style="margin: 0; font-weight: bold; color: #007bff;">${totalEntries}</p>
          <p style="margin: 0; color: #666666;">Total Entries</p>
        </div>
        <div style="flex: 1; text-align: center; padding: 16px; background-color: #ffffff; border: 1px solid #cccccc; border-radius: 8px;">
          <p style="margin: 0; font-weight: bold; color: #28a745;">${viewsToEntryRate}%</p>
          <p style="margin: 0; color: #666666;">Conversion Rate</p>
        </div>
        ${
          hasGrowth
            ? `<div style="flex: 1; text-align: center; padding: 16px; background-color: #ffffff; border: 1px solid #cccccc; border-radius: 8px;">
                <p style="margin: 0; font-weight: bold; color: ${
                  isPositiveGrowth ? "#28a745" : "#dc3545"
                };">${isPositiveGrowth ? "+" : ""}${growthPercentage}%</p>
                <p style="margin: 0; color: #666666;">Growth</p>
              </div>`
            : ""
        }
      </div>

      <div style="background-color: #ffffff; border: 1px solid #cccccc; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
        <h3 style="color: #007bff; text-align: center; margin: 0 0 16px 0;">Winner Information</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            <tr>
              <td style="padding: 8px 0; vertical-align: top; width: 120px; color: #666666;">Name:</td>
              <td style="padding: 8px 0; vertical-align: top; font-weight: bold;">${winnerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top; width: 120px; color: #666666;">Email:</td>
              <td style="padding: 8px 0; vertical-align: top;">
                <a href="mailto:${winnerEmail}" style="color: #28a745; text-decoration: none;">${winnerEmail}</a>
              </td>
            </tr>
          </tbody>
        </table>
        <p style="font-size: 12px; text-align: center; margin: 16px 0 0 0;">The winner has been automatically notified via email.</p>
      </div>

      <h3>Participant Demographics:</h3>
      <div style="display: flex; gap: 16px; margin-bottom: 16px;">
        <div style="flex: 1; background-color: #ffffff; border: 1px solid #cccccc; border-radius: 8px; padding: 16px;">
          <p style="margin: 0 0 8px 0; font-weight: bold;">Top Location</p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <p style="margin: 0;">${demographicData.topLocation}</p>
            <p style="margin: 0; font-weight: bold; color: #007bff;">${
              demographicData.topLocationPercentage
            }%</p>
          </div>
        </div>
        <div style="flex: 1; background-color: #ffffff; border: 1px solid #cccccc; border-radius: 8px; padding: 16px;">
          <p style="margin: 0 0 8px 0; font-weight: bold;">Top Device</p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <p style="margin: 0;">${demographicData.topDevice}</p>
            <p style="margin: 0; font-weight: bold; color: #007bff;">${
              demographicData.topDevicePercentage
            }%</p>
          </div>
        </div>
      </div>

      <div style="text-align: center; margin-bottom: 24px;">
        <a href="${dashboardUrl}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px;">View Detailed Analytics</a>
      </div>

      <p style="font-size: 12px; color: #666666; margin-top: 24px;">Thank you for using Raffily for your raffle campaign. We hope it was a success for your business!</p>
    </div>
  `;
};

module.exports = generateRaffleResultsEmail;
