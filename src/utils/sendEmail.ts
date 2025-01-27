import nodemailer from 'nodemailer';
import {generateTravelEmailHTML} from './generateHtml';

// 1. Configure transport (using a test SMTP or your provider’s credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD, 
  },
});


// 2. Send Email Function
export async function sendEmail(email: string,name:string,logoUrl:string,bestDays:any[],destination:string) {
const htmlContent = generateTravelEmailHTML(name, logoUrl, bestDays,destination);
  const mailOptions = {
    from: process.env.SMTP_USER,
    to:email,
    subject: "Your Best Days to Travel",
    html: htmlContent,
  };
  const info = await transporter.sendMail(mailOptions);
  console.log(`Email sent to ${email} - Response: ${info.response}`);
}
