// utils/email.js (FINAL FIXED - ES Module)

import transporter from '../config/nodemailer.js';

/**
 * Sends an email alert to a specific recipient.
 * @param {object} recipient - Object containing { role, email }
 * @param {string} subject - Email subject
 * @param {string} html - Email body (HTML format)
 */
export async function sendEmailAlert(recipient, subject, html) {
  if (!recipient.email) {
    console.warn(`[Email] ⚠️ Skipping: ${recipient.role} has no email address.`);
    return { status: 'Email Skipped', role: recipient.role, warning: 'No email provided' };
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipient.email,
      subject,
      html,
    });
    console.log(`[Email] ✅ Sent to ${recipient.role} (${recipient.email})`);
    return { status: 'Email Sent', role: recipient.role };
  } catch (error) {
    console.error(`[Email] ❌ Failed for ${recipient.role}: ${error.message}`);
    return { status: 'Email Failed', role: recipient.role, error: error.message };
  }
}
