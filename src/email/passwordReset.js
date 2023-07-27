import nodemailer from "nodemailer";
import { generateToken } from "../utils/generateToken.js";
import { passwordHtml } from "./html/password.reset.html.js";


export const sendResetEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amardroied@gmail.com",
      pass: "ksojvqybnzblkpea",
    },
  });
  const token = generateToken({ email: options.email, })
  let info = await transporter.sendMail({
    from: '"Ammar Abbas👻" <amardroied@gmail.com>',
    to: options.email,
    subject: "Password Reset 👻",
    html: passwordHtml(options.resetToken),
  });
  console.log(info.response);
};