interface PasswordResetEmailProps {
  name: string;
  resetUrl: string;
}

export const generatePasswordResetEmail = ({
  name,
  resetUrl,
}: PasswordResetEmailProps): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
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
          font-size: 20px;
          font-weight: bold;
          color: #333333;
          margin-bottom: 24px;
        }
        .text {
          font-size: 16px;
          line-height: 24px;
          color: #333;
          margin-bottom: 16px;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          margin: 10px 0;
          color: white;
          background-color: #007bff;
          text-decoration: none;
          border-radius: 4px;
          text-align: center;
        }
        .footer {
          font-size: 14px;
          line-height: 22px;
          color: #666666;
          margin-top: 24px;
        }
        .footer a {
          color: #00B8A9;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Reset Your Password</h1>
        </div>
        <h2 class="heading">Reset Your Password</h2>
        <p class="text">Hi ${name},</p>
        <p class="text">
          We received a request to reset your password for your Raffily account. If you didn't make this request, you
          can safely ignore this email.
        </p>
        <p class="text">
          To reset your password, click the button below:
        </p>
        <div style="text-align: center;">
          <a href="${resetUrl}" class="button">Reset Password</a>
        </div>
        <p class="footer">
          This link will expire in 1 hour. If you need a new reset link, please visit the login page and click "Forgot
          Password" again.
        </p>
        <p class="footer">
          If you didn't request a password reset, please contact us immediately at
          <a href="mailto:support@raffily.com">support@raffily.com</a>.
        </p>
      </div>
    </body>
    </html>
  `;
};

