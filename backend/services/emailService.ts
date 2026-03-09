import { Resend } from 'resend';
import logger from '../winstonlog/logger.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `Nova Invest <${process.env.EMAIL_USER || 'onboarding@resend.dev'}>`,
      to: [to],
      subject,
      text,
      html: html || text,
    });

    if (error) {
      logger.error('Error sending email through Resend SDK:', error);
      return { success: false, error };
    }

    logger.info(`Email sent: ${data?.id}`);
    return { success: true, messageId: data?.id };
  } catch (error) {
    logger.error('Error sending email:', error);
    return { success: false, error };
  }
};

export default { sendEmail };
