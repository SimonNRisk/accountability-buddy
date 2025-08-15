import nodemailer from "nodemailer";
import dotenv from "dotenv";

// explicitly load .env.local
dotenv.config({ path: ".env.local" });

console.log("GMAIL_USER:", process.env.GMAIL_USER);
console.log("GMAIL_APP_PASSWORD:", process.env.GMAIL_APP_PASSWORD);

const user = process.env.GMAIL_USER!;
const pass = process.env.GMAIL_APP_PASSWORD!;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user, pass },
});

(async () => {
  try {
    await transporter.verify();
    console.log("✅ SMTP login successful");
  } catch (err) {
    console.error("❌ SMTP login failed:", err);
  }
})();
