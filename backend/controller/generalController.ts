import type { Request, Response } from 'express';
import { sendContactUsEmail } from '../workers/emailService.js';
import logger from '../winstonlog/logger.js';

/**
 * Handles contact form submissions from the landing page.
 * Public endpoint.
 */
export const handleContactUs = async (req: Request, res: Response) => {
  try {
    const { user_name, user_email, subject, message } = req.body;

    if (!user_name || !user_email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields (name, email, subject, message) are required.' 
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user_email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address.' 
      });
    }

    const result = await sendContactUsEmail(user_name, user_email, subject, message);

    if (result.success) {
      logger.info(`Contact form submission from ${user_email} processed successfully.`);
      return res.status(200).json({ 
        success: true, 
        message: 'Your message has been sent successfully. We will get back to you soon.' 
      });
    } else {
      logger.error(`Failed to send contact email for ${user_email}:`, result.error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send message. Please try again later.' 
      });
    }
  } catch (error) {
    logger.error('Error in handleContactUs:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An internal server error occurred.' 
    });
  }
};
