import nodemailer from 'nodemailer';
import logger from '../winstonlog/logger.js';


const port = parseInt(process.env.SMTP_PORT || "587") ;
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: port,
  secure: port === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Nova Invest" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: html || text,
    });

    logger.info(`Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('Error sending email:', error);
    return { success: false, error };
  }
};

export default { sendEmail };
