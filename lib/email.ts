import nodemailer from "nodemailer";

export function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
  });
}

interface EnquiryEmailArgs {
  name: string;
  email: string;
  phone: string;
  country: string;
  treatment: string;
  message?: string;
}

export async function sendEnquiryEmail(data: EnquiryEmailArgs) {
  if (!process.env.SMTP_HOST) {
    console.log("SMTP not configured, skipping email send. Enquiry:", data);
    return;
  }

  const transporter = getTransporter();

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.ENQUIRY_TO_EMAIL,
    subject: `New Enquiry: ${data.treatment} - ${data.name}`,
    html: `
      <h2>New Treatment Enquiry</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Country:</strong> ${data.country}</p>
      <p><strong>Treatment:</strong> ${data.treatment}</p>
      <p><strong>Message:</strong> ${data.message || "-"}</p>
    `,
  });
}
