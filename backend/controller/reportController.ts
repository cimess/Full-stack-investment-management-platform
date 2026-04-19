import type { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { prisma } from "../lib/prisma.js";
import logger from "../winstonlog/logger.js";
import { Roles, Status } from "@prisma/client";
import { sendReportEmail } from "../workers/emailService.js";

/**
 * Submit a new report (Problem/Bug/Fraud/Service Issue)
 * Users and Managers can report issues.
 */
export const createReport = async (req: Request, res: Response, next: NextFunction) => {
  const { type, subject, description, targetId } = req.body;
  const reporterId = req.user?.id;

  if (!reporterId) return next(createError(401, "Unauthorized"));
  if (!subject || !description) return next(createError(400, "Subject and description are required"));

  try {
    const report = await prisma.systemReport.create({
      data: {
        reporterId,
        targetId,
        type: type || 'OTHER',
        subject,
        description,
        status: "PENDING"
      },
      include: {
        reporter: {
          select: { fullname: true, email: true }
        }
      }
    });

    // Notify the reporter that we received their report
    sendReportEmail(
      report.reporter.email,
      report.reporter.fullname,
      subject,
      {
        type: type || 'OTHER',
        status: 'PENDING',
        message: "Our engineering and security teams have been notified of your report. We prioritize these issues to ensure the platform remains secure."
      }
    );

    res.status(201).json({
      success: true,
      message: "Report submitted successfully. We will investigate and contact you via email.",
      data: report
    });
  } catch (err: any) {
    logger.error(`[Report] Creation failed: ${err.message}`);
    next(err);
  }
};

/**
 * Get all reports (Admin only)
 */
export const getAllReports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reports = await prisma.systemReport.findMany({
      include: {
        reporter: {
          select: { id: true, fullname: true, email: true, roles: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({ success: true, data: reports });
  } catch (err: any) {
    logger.error(`[Report] Fetch failed: ${err.message}`);
    next(err);
  }
};

/**
 * Update report status (Admin only)
 * This triggers an email update to the user.
 */
export const updateReportStatus = async (req: Request, res: Response, next: NextFunction) => {

  const { status, resolutionNote ,reportId} = req.body;
  const adminId = req.user?.id

  if (!reportId || !status) {
    return next(createError(400, "Report ID and status are required"));
  }
  if(!adminId){
    return next(createError(401, "You are not authorized to perform this action pls login again"));
  }

  try {

    const admin = await prisma.admin.findUnique({
      where: { user_id: adminId }
    })
    if(!admin?.super_admin){
      return next(createError(403, "Unauthorized"));
    } 
    const report = await prisma.systemReport.update({
      where: { id:reportId },
      data: { status: status as Status },
      include: {
        reporter: {
          select: { fullname: true, email: true }
        }
      }
    });

    // Notify user of status update
    
   sendReportEmail(
    report.reporter.email,
    report.reporter.fullname,
    report.subject,
    {
      type: report.type,
      status: status,
      message: resolutionNote || "Your report is being processed.",
      resolution:resolutionNote||undefined
    }
  )

    res.status(200).json({ success: true, message: "Report status updated and user notified.", data: report });
  } catch (err: any) {
    logger.error(`[Report] Status update failed: ${err.message}`);
    next(err);
  }
};

/**
 * Delete a report (Super Admin only)
 */
export const deleteReport = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body
  const adminId = req.user?.id;

  try {
    // Check if the current admin is a Super Admin
    const admin = await prisma.admin.findUnique({
      where: { user_id: adminId } as any
    });

    if (!admin?.super_admin) {
      return next(createError(403, "UnAuthorised to perform this action"));
    }

    await prisma.systemReport.delete({
      where: { id }
    });

    res.status(200).json({ success: true, message: "Report deleted successfully." });
  } catch (err: any) {
    logger.error(`[Report] Deletion failed: ${err.message}`);
    next(err);
  }
};
