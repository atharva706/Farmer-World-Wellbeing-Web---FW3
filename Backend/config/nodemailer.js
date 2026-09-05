import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log("❌ Nodemailer verification failed:");
        console.log(error);
    } else {
        console.log("✅ Nodemailer SMTP connection successful");
    }
});

export default transporter;