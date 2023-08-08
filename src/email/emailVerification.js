import nodemailer from "nodemailer";
import { generateToken } from "../utils/generateToken.js";
import { emailHtml } from "./html/user.email.html.js";

export const sendEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amardroied@gmail.com",
      pass: process.env.EMAIL_KEY,
    },
  });
  const token = generateToken({ email: options.email, })
  let info = await transporter.sendMail({
    from: '"Ammar Abbas👻" <amardroied@gmail.com>',
    to: options.email,
    subject: "Please verify your email address 👻",
    html: emailHtml(token),
  });
  console.log(info.response);
};