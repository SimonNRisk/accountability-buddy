import nodemailer from "nodemailer";

export function getTransporter() {
  const user = process.env.GMAIL_USER!;
  const pass = process.env.GMAIL_APP_PASSWORD!;
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

export async function sendHtmlEmail({
  subject,
  html,
  to,
  fromName = process.env.FROM_NAME || "Accountability",
}: {
  subject: string;
  html: string;
  to: string | string[];
  fromName?: string;
}) {
  const transporter = getTransporter();
  const info = await transporter.sendMail({
    from: `"${fromName}" <${process.env.GMAIL_USER}>`,
    to: Array.isArray(to) ? to.join(",") : to,
    subject,
    html,
  });
  return info;
}
