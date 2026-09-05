// utils/sms.js (FINAL FIXED ES MODULE)

import dotenv from 'dotenv';
import twilio from 'twilio';

// Load environment variables (optional if already done in server.js)
dotenv.config();

// Initialize Twilio client using environment variables
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Sends an SMS alert via Twilio to a specific recipient.
 * @param {object} recipient - Must include { role, phone }
 * @param {string} message - Message content
 */
export async function sendRealSmsAlert(recipient, message) {
  if (!recipient.phone) {
    console.warn(`[Twilio] ⚠️ Skipping SMS: Recipient ${recipient.role} has no phone number.`);
    return { status: 'SMS Skipped', role: recipient.role, warning: 'No phone number provided' };
  }

  // Ensure proper phone number format (+91 for India)
  const toPhoneNumber = recipient.phone.startsWith('+91')
    ? recipient.phone
    : `+91${9689722003}`;

  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: toPhoneNumber,
    });
    console.log(`[Twilio] ✅ SMS sent to ${recipient.role} (${toPhoneNumber}). SID: ${result.sid}`);
    return { status: 'SMS Sent', role: recipient.role };
  } catch (error) {
    console.error(`[Twilio] ❌ SMS failed for ${recipient.role} (${toPhoneNumber}): ${error.message}`);
    return { status: 'SMS Failed', role: recipient.role, error: error.message };
  }
}
