/**
 * Generate HTML email template for OTP verification
 * @param {string} otp - The 4-digit OTP code
 * @returns {string} HTML email template
 */
function generateOTPEmailHTML(otp) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - Tasky</title>
    <!--[if mso]>
    <style type="text/css">
        body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
    </style>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0f172a; padding: 40px 20px;">
        <tr>
            <td align="center">
                <!-- Main Container -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #1e293b; border: 1px solid #334155; border-radius: 16px;">

                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 30px 40px; text-align: center;">
                            <!-- Logo -->
                            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 24px auto;">
                                <tr>
                                    <td width="64" height="64" align="center" valign="middle" style="background-color: #3b82f6; border-radius: 16px; font-size: 32px; font-weight: bold; color: #ffffff;">
                                        T
                                    </td>
                                </tr>
                            </table>

                            <!-- Title -->
                            <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #ffffff;">
                                Verify Your Email
                            </h1>

                            <!-- Subtitle -->
                            <p style="margin: 12px 0 0 0; font-size: 16px; color: #94a3b8; line-height: 1.5;">
                                Welcome to Tasky! Use the code below to complete your registration.
                            </p>
                        </td>
                    </tr>

                    <!-- Divider -->
                    <tr>
                        <td style="padding: 0 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="border-top: 1px solid #334155;"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- OTP Section -->
                    <tr>
                        <td style="padding: 40px;">
                            <!-- Info Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1e3a5f; border-left: 4px solid #3b82f6; border-radius: 8px; margin-bottom: 32px;">
                                <tr>
                                    <td style="padding: 16px 20px;">
                                        <p style="margin: 0; color: #93c5fd; font-size: 14px; line-height: 1.6;">
                                            <strong>📧 Email Verification Required</strong><br>
                                            Enter this code in the verification page to continue setting up your account.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- OTP Code Container -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <table cellpadding="0" cellspacing="0" border="0" style="background-color: #0f172a; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px;">
                                            <tr>
                                                <td align="center">
                                                    <p style="margin: 0 0 12px 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                                                        Your Verification Code
                                                    </p>
                                                    <!-- OTP Code -->
                                                    <div style="font-size: 40px; font-weight: bold; color: #ffffff; letter-spacing: 8px; text-align: center; font-family: 'Courier New', Courier, monospace;">
                                                        ${otp}
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Expiry Notice -->
                            <p style="margin: 24px 0 0 0; text-align: center; font-size: 14px; color: #94a3b8;">
                                ⏰ This code will expire in <strong style="color: #fbbf24;">10 minutes</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Divider -->
                    <tr>
                        <td style="padding: 0 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="border-top: 1px solid #334155;"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Security Notice -->
                    <tr>
                        <td style="padding: 30px 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #2d1a1a; border-left: 4px solid #ef4444; border-radius: 8px;">
                                <tr>
                                    <td style="padding: 16px 20px;">
                                        <p style="margin: 0; color: #fca5a5; font-size: 13px; line-height: 1.6;">
                                            <strong>🔒 Security Notice</strong><br>
                                            Never share this code with anyone. Tasky staff will never ask for your verification code. If you didn't request this code, please ignore this email.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px 40px 40px; text-align: center;">
                            <!-- Security Badge -->
                            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 20px auto; background-color: #0f172a; border: 1px solid #334155; border-radius: 999px; padding: 8px 16px;">
                                <tr>
                                    <td style="font-size: 10px; color: #94a3b8;">
                                        <span style="color: #10b981;">●</span> Your data is protected with enterprise-grade security
                                    </td>
                                </tr>
                            </table>

                            <!-- Branding -->
                            <p style="margin: 0; font-size: 14px; color: #64748b;">
                                Made with ❤️ by <strong style="color: #3b82f6;">Tasky</strong>
                            </p>
                            <p style="margin: 8px 0 0 0; font-size: 12px; color: #475569;">
                                Your productivity companion
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
}

module.exports = { generateOTPEmailHTML };
