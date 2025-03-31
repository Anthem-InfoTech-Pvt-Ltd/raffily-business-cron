const MerchantWelcomeEmailHTML = (name: string, businessName: string, loginUrl: string, helpCenterUrl: string, setupGuideUrl: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Raffily</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; color: #333;">
  <!-- Hero Section -->
  <div style="background-color: #e3f2fd; padding: 32px; margin-bottom: 32px; border-radius: 8px; text-align: center;">
    <div style="background-color: #ffffff; border-radius: 50%; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="font-size: 32px; line-height: 1;">🚀</div>
    </div>
    <h1 style="color: #1976d2; margin: 0;">Welcome to Raffily!</h1>
    <p style="font-size: 18px; margin: 8px 0;">Let's grow your business with engaging raffles</p>
  </div>

  <!-- Main Content -->
  <p>Hi ${name},</p>
  <p>Welcome to Raffily! We're thrilled to have <strong>${businessName}</strong> join our platform. You've taken the first step toward engaging your customers with exciting raffles that can help grow your business.</p>

  <h3>Here's what you can do with Raffily:</h3>
  <div style="background-color: #ffffff; border: 1px solid #ddd; padding: 24px; margin-bottom: 24px; border-radius: 8px;">
    <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
      <div style="min-width: 24px; height: 24px; background-color: #1976d2; border-radius: 50%; color: #ffffff; display: flex; align-items: center; justify-content: center; margin-right: 12px; margin-top: 2px;">1</div>
      <div>
        <p style="font-weight: bold; margin: 0 0 4px;">Create Engaging Raffles</p>
        <p style="font-size: 14px; margin: 0;">Design beautiful raffle pages that convert visitors into participants</p>
      </div>
    </div>
    <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
      <div style="min-width: 24px; height: 24px; background-color: #1976d2; border-radius: 50%; color: #ffffff; display: flex; align-items: center; justify-content: center; margin-right: 12px; margin-top: 2px;">2</div>
      <div>
        <p style="font-weight: bold; margin: 0 0 4px;">Collect Valuable Customer Data</p>
        <p style="font-size: 14px; margin: 0;">Grow your email list and gather insights about your audience</p>
      </div>
    </div>
    <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
      <div style="min-width: 24px; height: 24px; background-color: #1976d2; border-radius: 50%; color: #ffffff; display: flex; align-items: center; justify-content: center; margin-right: 12px; margin-top: 2px;">3</div>
      <div>
        <p style="font-weight: bold; margin: 0 0 4px;">Automate Winner Selection</p>
        <p style="font-size: 14px; margin: 0;">Let our platform handle the drawing process with complete fairness</p>
      </div>
    </div>
    <div style="display: flex; align-items: flex-start;">
      <div style="min-width: 24px; height: 24px; background-color: #1976d2; border-radius: 50%; color: #ffffff; display: flex; align-items: center; justify-content: center; margin-right: 12px; margin-top: 2px;">4</div>
      <div>
        <p style="font-weight: bold; margin: 0 0 4px;">Analyze Performance</p>
        <p style="font-size: 14px; margin: 0;">Track metrics and optimize your raffles for better results</p>
      </div>
    </div>
  </div>

  <p>Ready to get started? Your account is already set up and ready to go. Click the button below to log in to your dashboard and create your first raffle.</p>
  <div style="text-align: center; margin: 24px 0;">
    <a href="${loginUrl}" style="display: inline-block; background-color: #1976d2; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 16px;">Log In to Your Dashboard</a>
  </div>

  <hr style="border: none; border-top: 1px solid #ddd; margin: 32px 0;">

  <h3>Need Help Getting Started?</h3>
  <div style="display: flex; justify-content: space-between; text-align: center;">
    <div>
      <a href="${setupGuideUrl}" style="display: inline-block; border: 1px solid #1976d2; color: #1976d2; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 16px;">Setup Guide</a>
    </div>
    <div>
      <a href="${helpCenterUrl}" style="display: inline-block; border: 1px solid #1976d2; color: #1976d2; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 16px;">Help Center</a>
    </div>
  </div>

  <p style="font-size: 12px; color: #888; margin-top: 32px;">If you have any questions or need assistance, our support team is always here to help. Just reply to this email or contact us at <a href="mailto:support@raffily.com" style="color: #1976d2;">support@raffily.com</a>.</p>
  <p style="font-size: 12px; color: #888; margin-bottom: 0;">We're excited to see your first raffle! 🎉</p>
</body>
</html>
`;

export default MerchantWelcomeEmailHTML;

