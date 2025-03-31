/**
 * Generates the raffle winner email HTML dynamically.
 * @param {Object} props
 * @param {string} props.name - Winner's name
 * @param {string} props.raffleName - Name of the raffle
 * @param {string} props.merchantName - Merchant's name
 * @param {string} props.prize - Prize won
 * @param {string} props.claimUrl - URL to claim the prize
 * @param {string} props.contactEmail - Merchant's contact email
 * @returns {string} - HTML content for the email
 */
const generateRaffleWinnerEmail = (props) => {
  const { name, raffleName, merchantName, prize, claimUrl, contactEmail } =
    props;

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #333333; font-size: 20px; font-weight: bold; margin: 0;">
          🎉 Congratulations! You're a Winner! 🎉
        </h2>
      </div>

      <p style="font-size: 16px; line-height: 24px; margin: 16px 0;">Hi ${name},</p>

      <p style="font-size: 16px; line-height: 24px; margin: 16px 0;">
        Great news! You've been selected as the winner of the <strong>${raffleName}</strong> raffle by 
        <strong>${merchantName}</strong>.
      </p> 

      <div style="background-color: #f8f9fa; border-radius: 6px; padding: 16px; margin: 24px 0;">
        <p style="font-size: 16px; line-height: 24px; margin: 0 0 8px; font-weight: bold;">Your Prize:</p>
        <p style="font-size: 18px; line-height: 26px; margin: 8px 0; color: #00B8A9; font-weight: bold;">${prize}</p>
      </div>

      <p style="font-size: 16px; line-height: 24px; margin: 16px 0;">
        To claim your prize, please click the button below:
      </p>

      <div style="text-align: center; margin: 24px 0;">
        <a href="${claimUrl}" style="display: inline-block; padding: 12px 24px; background-color: #00B8A9; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px;">
          Claim Your Prize
        </a>
      </div>

      <p style="font-size: 16px; line-height: 24px; margin: 16px 0;">
        If you have any questions about your prize or how to claim it, please contact ${merchantName} directly at 
        <a href="mailto:${contactEmail}" style="color: #00B8A9; text-decoration: none;">${contactEmail}</a>.
      </p>

      <p style="font-size: 14px; line-height: 22px; margin: 24px 0 16px; color: #666666;">
        Congratulations again, and thank you for participating in the raffle!
      </p>
    </div>
  `;
};

module.exports = generateRaffleWinnerEmail;
