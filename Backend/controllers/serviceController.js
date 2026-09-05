// controllers/serviceController.js (FINAL CORRECTED VERSION - ES Module)

// 1. Convert all 'require()' to 'import' statements (with .js extensions for local files)
import { 
    OFFICERS_DATA, 
    GOVT_RECIPIENTS, 
    FW3_TECH_LEAD, 
    TECHNICAL_FEEDBACK_LOG,
    SOIL_TESTING_OFFICERS
} from '../models/db.js';

import { sendEmailAlert } from '../utils/email.js'; // Ensure utility files are also .js
import { sendRealSmsAlert } from '../utils/sms.js'; // Ensure utility files are also .js
import transporter from '../config/nodemailer.js'; // Assuming nodemailer.js uses a default export

// Mock storage for appointments
const SOIL_APPOINTMENTS_LOG = []; 
let appointmentIdCounter = 1001; 

// ROUTE 3: BOOK SOIL TEST APPOINTMENT
// 2. Convert 'exports.functionName = ...' to 'export const functionName = ...'
export const bookAppointment = async (req, res) => {
    // Expected fields from the frontend
    const { farmerName, farmerPhone, village, landLocation, preferredDate, email, officer, time } = req.body;

    // 1. Basic Validation
    if (!farmerName || !farmerPhone || !village || !landLocation || !preferredDate) {
        return res.status(400).json({ 
            success: false, 
            message: "Missing required fields for appointment booking." 
        });
    }

    const newAppointment = {
        id: `APPT${appointmentIdCounter++}`,
        farmerName,
        farmerPhone,
        farmerEmail: email || null,
        village,
        landLocation,
        preferredDate,
        time: time || null,
        officer: officer || 'Unassigned',
        status: 'Pending',
        timestamp: new Date().toISOString()
    };

    try {
        // 2. Log the appointment
        SOIL_APPOINTMENTS_LOG.push(newAppointment);
        console.log(`[APPOINTMENT] ✅ New soil test booked: ${newAppointment.id} in ${village}`);
        console.log(`[APPOINTMENT] Officer received from form: "${officer}"`);
        console.log(`[APPOINTMENT] Available officers:`, Object.keys(SOIL_TESTING_OFFICERS));
        const officerRecipient = SOIL_TESTING_OFFICERS[officer];
        console.log(`[APPOINTMENT] Matched officer record:`, officerRecipient);

        // 3. Notify the selected officer
        const officerData = officerRecipient || OFFICERS_DATA;

        const emailSubject = `NEW APPOINTMENT: Soil Test Request (${newAppointment.id})`;
        const emailHtml = `
            <h2>New Soil Testing Appointment Booked</h2>
            <p><strong>Appointment ID:</strong> ${newAppointment.id}</p>
            <p><strong>Farmer:</strong> ${farmerName} (Phone: ${farmerPhone})</p>
            ${email ? `<p><strong>Farmer Email:</strong> ${email}</p>` : ''}
            <p><strong>Assigned Officer:</strong> ${officer || 'Not specified'}</p>
            <p><strong>Village:</strong> ${village}</p>
            <p><strong>Location Details:</strong> ${landLocation}</p>
            <p><strong>Preferred Date:</strong> ${preferredDate}${time ? ` at ${time}` : ''}</p>
            <hr>
            <p>Please contact the farmer to confirm and dispatch the soil testing team.</p>
        `;

        await sendEmailAlert(officerData, emailSubject, emailHtml);

        // 4. Send confirmation email to the farmer (if email provided)
        if (email) {
            const farmerSubject = `Appointment Confirmed: Soil Testing (${newAppointment.id})`;
            const farmerHtml = `
                <h2>Your Soil Testing Appointment is Confirmed ✅</h2>
                <p>Dear <strong>${farmerName}</strong>,</p>
                <p>Your soil testing appointment has been successfully booked. Here are your details:</p>
                <table style="border-collapse:collapse; width:100%; font-family:sans-serif;">
                    <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Appointment ID</strong></td><td style="padding:8px; border:1px solid #ddd;">${newAppointment.id}</td></tr>
                    <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Assigned Officer</strong></td><td style="padding:8px; border:1px solid #ddd;">${officer || 'Will be assigned'}</td></tr>
                    <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Date</strong></td><td style="padding:8px; border:1px solid #ddd;">${preferredDate}${time ? ` at ${time}` : ''}</td></tr>
                    <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Location</strong></td><td style="padding:8px; border:1px solid #ddd;">${landLocation}</td></tr>
                    <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Village</strong></td><td style="padding:8px; border:1px solid #ddd;">${village}</td></tr>
                </table>
                <p style="margin-top:16px;">The officer will contact you on <strong>${farmerPhone}</strong> to confirm the visit.</p>
                <p style="color:#666; font-size:12px;">— FW3 Farmer World Wellbeing Web</p>
            `;
            await sendEmailAlert({ email, role: 'Farmer' }, farmerSubject, farmerHtml);
        }
        
        // 4. Send Success Response
        res.status(200).json({ 
            success: true, 
            message: `Appointment booked successfully! ID: ${newAppointment.id}. Officer notified.`,
            appointment: newAppointment
        });

    } catch (error) {
        console.error(`[APPOINTMENT] ❌ Failed to book or notify: ${error.message}`);
        res.status(500).json({ 
            success: false, 
            message: "Appointment saved, but failed to notify officer via email.", 
            error: error.message 
        });
    }
};

// ROUTE 4: EMERGENCY TRIGGER
// 2. Convert 'exports.functionName = ...' to 'export const functionName = ...'
export const emergencyTrigger = async (req, res) => {
    const { village, disasterType, severity } = req.body;
    if (!village || !disasterType || !severity)
        return res.status(400).json({ message: "Missing required fields." });

    console.log(`🚨 Emergency: ${disasterType} in ${village} (${severity})`);

    const smsMsg = `🚨 ALERT: ${disasterType} (Severity: ${severity}) in ${village}. All responders activate protocol.`;
    const emailSubject = `CRITICAL: EMERGENCY - ${disasterType} in ${village}`;
    const emailHtml = `
        <h2>Emergency Triggered</h2>
        <p><strong>Type:</strong> ${disasterType}</p>
        <p><strong>Village:</strong> ${village}</p>
        <p><strong>Severity:</strong> ${severity}</p>
        <p>Immediate action required by disaster response team.</p>
    `;

    try {
    const recipientsArray = Object.values(GOVT_RECIPIENTS);

    // Send SMS (for those who have a phone)
    const smsPromises = recipientsArray
        .filter(r => r && r.phone)
        .map(r => sendRealSmsAlert(r, smsMsg));

    // Send Email (for all who have an email)
    const emailPromises = recipientsArray
        .filter(r => r && r.email)
        .map(r => sendEmailAlert(r, emailSubject, emailHtml));

    // Wait for all to complete
    await Promise.all([...smsPromises, ...emailPromises]);

    res.status(200).json({ success: true, message: "Emergency alerts sent to all recipients (SMS + Email)." });
}
catch (error) {
        console.error(`[EMERGENCY] ❌ Failed to process alerts: ${error.message}`);
        res.status(500).json({ 
            success: false, 
            message: "Failed to send alerts due to internal error.", 
            error: error.message 
        });
    }
};

// ROUTE 5: SUBMIT TECH FEEDBACK
// 2. Convert 'exports.functionName = ...' to 'export const functionName = ...'
export const submitTechFeedback = async (req, res) => {
    const { feedbackType, feedbackDetails, villageTeamMember, villageName } = req.body;

    if (!feedbackDetails || !villageTeamMember) {
        return res.status(400).json({ message: "Feedback details and team member ID are required." });
    }

    const feedbackEntry = {
        timestamp: new Date().toISOString(),
        type: feedbackType,
        details: feedbackDetails,
        reporter: villageTeamMember,
        village: villageName || 'Unknown Village'
    };
    
    TECHNICAL_FEEDBACK_LOG.push(feedbackEntry);
    console.log(`[FEEDBACK] ✅ New ${feedbackType} received from ${villageTeamMember} in ${villageName}. Total: ${TECHNICAL_FEEDBACK_LOG.length}`);

    const emailSubject = `FW3 Feedback: [${feedbackType}] from ${villageTeamMember} (${villageName})`;
    const emailHtml = `
        <h3>Village Tech Team Feedback Submitted</h3>
        <p><strong>Type:</strong> ${feedbackType}</p>
        <p><strong>Village:</strong> ${villageName}</p>
        <p><strong>Reporter:</strong> ${villageTeamMember}</p>
        <hr>
        <h4>Details & Observations:</h4>
        <p>${feedbackDetails.replace(/\n/g, '<br>')}</p>
        <hr>
        <small>Total feedback received in session: ${TECHNICAL_FEEDBACK_LOG.length}</small>
    `;

    try {
        await sendEmailAlert(FW3_TECH_LEAD, emailSubject, emailHtml);

        res.status(200).json({ 
            success: true, 
            message: "Feedback submitted successfully. Tech Lead has been notified." 
        });
    } catch (error) {
        console.error(`[FEEDBACK] ❌ Failed to send notification email: ${error.message}`);
        res.status(500).json({ 
            success: false, 
            message: "Feedback logged but failed to notify Tech Lead via email.", 
            error: error.message 
        });
    }
};