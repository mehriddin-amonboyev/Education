import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

export const sendMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_FROM,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  await transporter.sendMail({ to, subject, html });
};