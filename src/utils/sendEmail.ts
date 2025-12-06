import nodemailer from 'nodemailer';
import { generateTravelEmailHTML } from './generateHtml';

// 1. Configure transport (using a test SMTP or your provider’s credentials)
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASSWORD,
  },
});


// 2. Send Email Function
export async function sendEmail(email: string, name: string, logoUrl: string, bestDays: any[], destination: string) {
  try {
    const htmlContent = generateTravelEmailHTML(name, logoUrl, bestDays, destination);
    const mailOptions = {
      from: process.env.C_EMAIL,
      to: email,
      subject: "Your Best Days to Travel",
      html: htmlContent,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email} | MessageId: ${info.messageId}`);

    // If messageId exists → email was sent successfully
    return true;
  } catch (error: any) {
    console.error("Error sending email:", error.message || error);
    return false;
  }

}
