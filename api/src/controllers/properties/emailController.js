// controllers/emailController.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); 


export const sendEmail = async (fromEmail, toEmail, message) => {
   const transporter = nodemailer.createTransport({
     service: "gmail",
     auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS,
     },
   });
 
   const mailOptions = {
     from: `"${fromEmail}" <${process.env.EMAIL_USER}>`, 
     to: toEmail,
     subject: "Новое сообщение от посетителя",
     text: message,
   };
 
   return transporter.sendMail(mailOptions);
 };


export const handleEmailSending = async (req, res) => {
  const { email, message } = req.body;

  try {
    await sendEmail(email, "baghdasaryan.anushik@list.ru", message); 
    res.status(200).send("Сообщение успешно отправлено!");
  } catch (error) {
    console.error("Ошибка при отправке сообщения по электронной почте:", error);
    res.status(500).send("Произошла ошибка при отправке сообщения.");
  }
};
