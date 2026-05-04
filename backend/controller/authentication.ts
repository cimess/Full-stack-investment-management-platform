import createError from "http-errors";
import { loginSchema, registerSchema, verifyEmailSchema } from "../zodschema/registerschemer.js";
import { prisma } from "../lib/prisma.js"
import logger from "../winstonlog/logger.js";
import type { Request, Response } from "express";
import argon2 from "argon2";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendVerificationEmail, sendWelcomeEmail } from "../workers/emailService.js";
import { generateAccessToken, generateRefreshToken, verifyTokenSecret } from "../middlewear/auth.js";
import type { NextFunction } from "express";
import redisClient, { getCache, setCache } from "../lib/redis.js";




export const googleAuth = async (req: Request, res: Response) => {

  const user = req.user as { id: string; roles: string; email: string; username: string; fullname: string; manager_id: string | null; isVerified: boolean; avatar?: string; password?: string | null; isNewUser?: boolean };

  const oldRefreshToken = req.cookies?.refreshToken;


  if (oldRefreshToken) {
    await prisma.refreshToken.deleteMany({
      where: {
        user_id: user?.id,
        token: oldRefreshToken
      }
    });
  }

  // --- CHECK FOR DISABLED STATUS ---
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (dbUser?.disabled) {
    const frontendUrl = process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL
      : "http://localhost:5173";
    return res.redirect(`${frontendUrl}/login?error=account_deactivated`);
  }

  if (!user.isVerified) {

    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true }
    });
  }

  const accessToken = generateAccessToken({
    id: user.id,
    roles: user.roles
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
    roles: user.roles
  });

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      user_id: user.id
    }
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  const { id, roles, username, fullname, email, manager_id: managerId, avatar } = user;
  const frontendUrl = process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL
    : "http://localhost:5173";



  // Redirect to complete registration if user has no password (common for new Google users)
  const needsPassword = user.isNewUser || !user.password;
  
  if(needsPassword){
    sendWelcomeEmail(email, fullname || username || "Valued Investor", roles).catch(err => {
      logger.error(`Error sending welcome package to ${email}: ${err.message}`);
    });
  }
  const target = needsPassword ? `${frontendUrl}/complete-registration` : `${frontendUrl}/dashboard`;

  if (redisClient) {
  await redisClient.del(`user:profile:${user.id}`);
  logger.info(`[Auth] Busted Redis cache for Google user: ${user.id}`);
}
  return res.redirect(target);

}



export const registerUser = async (req: Request, res: Response, next: NextFunction) => {

  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    logger.warn(`Validation failed for ${req.originalUrl}: ${result.error.issues[0]?.message}`);
    return next(createError(400, result.error.issues[0]?.message as string));
  }
  const { username, name, password, email, role } = result.data;
  const userRole = role === "CLIENT" ? "USER" : 'MANAGER';

  const hashedPassword = await argon2.hash(password, {
    timeCost: 2,
    memoryCost: 2 ** 12, // 4MB
    parallelism: 1,
  });




  try {
 
    await prisma.$transaction(async (tx) => {
      const otp = crypto.randomInt(100000, 999999).toString();
      const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      const user = await tx.user.create({
        data: {
          email,
          fullname: name + ' ' + username,
          password: hashedPassword,
          username,
          roles: userRole ? userRole : 'USER',
          isVerified: false,
          verificationToken: otp,
          verificationTokenExpires: otpExpires,
          termsAccepted: true,
        }
      })
      
      const emailResponse = await sendVerificationEmail(email, otp);

      if (!emailResponse.success) {
        logger.error(`Failed to send verification email to ${email}`);
      }
      if (role === "MANAGER") {

        // generate approval code
        const approval_code = crypto.randomUUID();

        const result =

          await tx.manager.create({
            data: {
              manager_id: user.id,
              manager_slot: 10,
              approval_code: approval_code,
            }
          })
      }
      // Do not log the user in immediately since they are unverified.
      // We skip returning the accessToken and refreshToken cookies.
      
      const { id, roles, username: user_name, fullname, email: user_email, manager_id } = user as any;
      return res.status(201).json({
        success: true,
        message: "Registration successful! Please verify your email.",
        data: { id, roles, fullname, username: user_name, email: user_email, manager_id }
      });

    }, {
      timeout: 30000
    })



  } catch (err: any) {
    logger.error(err);
    if (err.code === 'P2002') {
      return next(createError(409, "Email already exists"));
    }
    return next(createError(500, `Internal Server Error: ${err.message}`));
  }

}
export const sendToken = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    const emailResponse = await sendVerificationEmail(email, otp);

    if (!emailResponse.success) {
      return next(createError(500, "Failed to send verification email"));
    }

    // Update user with token
    await prisma.user.update({
      where: { email },
      data: {
        verificationToken: otp,
        verificationTokenExpires: otpExpires
      }
    });

    return res.status(200).json({
      data: {success: true,
      message: "A verification token has been sent to your email."
      }
    });
  } catch (err: any) {
    logger.error(err);
    return next(createError(500, `Internal Server Error: ${err.message}`));
  }
}

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const result = verifyEmailSchema.safeParse(req.body);

  if (!result.success) {
    return next(createError(400, result.error.issues[0]?.message as string));
  }

  const { email, otp } = result.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    if (user.isVerified) {
      return res.status(200).json({ success: true, message: "Email is already verified" });
    }

    if (user.verificationToken !== otp || !user.verificationTokenExpires ||
      user.verificationTokenExpires < new Date()) {
      return next(createError(400, "Invalid or expired verification code"));
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpires: null
      }
    });

    const accessToken = generateAccessToken({
      id: user.id,
      roles: user.roles
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      roles: user.roles
    });

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        user_id: user.id
      }
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const { id, roles, username: user_name, fullname, email: user_email, manager_id } = user as any;

    logger.info(`User email verified and logged in: ${user.email}`);
    const userRole=roles==='USER'?'Client':roles
    // Dispatch welcome email asynchronously 
    sendWelcomeEmail(user.email, fullname || user_name || "Valued Investor", userRole).catch(err => {
      logger.error(`Error sending welcome package to ${user.email}: ${err.message}`);
    });

    return res.status(200).json({ 
       success: true, 
       message: "Email verified successfully. Redirecting...",
       data: { id, roles, fullname, username: user_name, email: user_email, manager_id }
    });
  } catch (err: any) {
    logger.error(err);
    return next(createError(500, `Internal Server Error: ${err.message}`));
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {

  const result = loginSchema.safeParse(req.body);
  const token_refresh = req.cookies.refreshToken;

  if (!result.success) {
    return next(createError(400, result.error.issues[0]?.message as string));
  }

  const { email, password } = result.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (!user) {
      return next(createError(401, "invalid credentials"));
    }
    if (user.restricted) {
      return next(createError(401, "user is currently restricted"));
    }
    if (user.disabled) {
      return next(createError(401, "This account has been deactivated. Please contact support to reactivate."));
    }

    if (!user.isVerified) {
      return next(createError(403, "Please verify your email address to log in"));
    }
    if (!user.password) {
      return next(createError(401, "This account is registered via Google OAuth. Please log in with Google."));
    }

    let isPasswordValid = false;
    let password_hash: string | null = null;
    if (user.password.startsWith("$2")) {
      // Handle legacy bcrypt hash
      isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        password_hash = await argon2.hash(password, {
          timeCost: 2,
          memoryCost: 2 ** 12, // 4MB
          parallelism: 1,
        });
      }
    } else {
      // Handle Argon2 verify
      isPasswordValid = await argon2.verify(user.password, password);
    }

    if (!isPasswordValid) {
      return next(createError(401, "invalid credentials"));
    }
    await prisma.$transaction(async (tx) => {

      if (password_hash) {
        // Upgrade to Argon2 immediately
        await prisma.user.update({
          where: { id: user.id },
          data: { password: password_hash }
        });
        logger.info(`Upgraded password hash to Argon2 for user: ${user.email}`);
      }

      const checked_token = token_refresh ? verifyTokenSecret(token_refresh) : null;
      if (checked_token) {
        await tx.refreshToken.deleteMany({
          where: {
            user_id: user.id,
            token: token_refresh
          }
        })
      }
      const accessToken = generateAccessToken({ id: user.id, roles: user.roles })
      const refreshToken = generateRefreshToken({ id: user.id, roles: user.roles })

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      // access token cookie should be short lived
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 10 * 60 * 1000
      })
      const saveRefreshToken = await tx.refreshToken.create({
        data: {
          token: refreshToken,
          user_id: user.id
        }
      })
      if (!saveRefreshToken) {
        return next(createError(500, "Internal Server Error"));
      }
      const { id, roles, username, fullname, manager_id } = user
      const email_user = user.email
      return res.status(200).json({
        success: true, message: "user logged in successfully",
        data: { id, roles, fullname, email_user, username, manager_id }
      })
    }, {
      timeout: 15000
    })
  } catch (err: any) {
    logger.error(err);
    return next(createError(500, `Internal Server Error: ${err.message}`));
  }
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.cookies.refreshToken;

  if (!token) {
    return next(createError(401, "Unauthorized"));
  }

  const decodedToken = verifyTokenSecret(token);
  if (!decodedToken) {
    return next(createError(403, "pls login again"));
  }

  const tokenExists = await prisma.refreshToken.findUnique({
    where: { token }
  });
  if (!tokenExists) {
    return next(createError(403, "This session has been revoked/logged out!"));
  }

  const accessToken = generateAccessToken({ id: decodedToken.id, roles: decodedToken.roles })

  const refreshToken = generateRefreshToken({ id: decodedToken.id, roles: decodedToken.roles })

  await prisma.refreshToken.deleteMany({
    where: {
      user_id: decodedToken.id
    }
  })


  const saveRefreshToken = await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      user_id: decodedToken.id
    }
  })
  if (!saveRefreshToken) {
    return next(createError(500, "Internal Server Error"));
  }
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60 * 1000
  })

  return res.status(200).json({ success: true, message: "token refreshed successfully" })

}


export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  const user_logged_in = req.user;
  if (!user_logged_in) {
    return next(createError(401, "Unauthorized"));
  }

  const cacheKey = `user:profile:${user_logged_in.id}`;
  try {
    const cachedProfile = await getCache(cacheKey);
    if (cachedProfile) {
      logger.info(`[Auth] Serving profile from cache for user: ${user_logged_in.id}`);
      return res.json(JSON.parse(cachedProfile));
    }
  } catch (err) {
    logger.warn(`[Auth] Redis error in getMe: ${err}`);
  }
  const user = await prisma.user.findUnique({
    where: { id: user_logged_in.id },
    select: {
      id: true,
      roles: true,
      fullname: true,
      username: true,
      email: true,
      avatar: true,
      isVerified: true,
      password: true, // Needed to check if user has set a password
      settings: true,
      manager: true, // The manager's OWN profile
      to_admin: true,   // The admin's OWN profile
      termsAccepted: true,
      client_manager: { // The manager attached TO this client
        select: {
          id: true,
          bio: true,
          title: true,
          specialization: true,
          years_experience: true,
          success_rate: true,
          contact_email: true,
          availability: true,
          linkedin_url: true,
          aum_managed: true,
          user: {
            select: {
              fullname: true,
              email: true
            }
          }
        }
      } as any // Bypass TS error 'bio does not exist' until user runs prisma generate locally
    }
  }) as any;
  if (!user) {
    return next(createError(401, "Unauthorized"));
  }

  // Convert BigInt to string and check if password exists
  const serializedUser = {
    ...user,
    hasPassword: !!user.password,
    password: undefined, // Don't send the password hash to the frontend
    admin: user.to_admin || null, // Map back for frontend consistency
    manager: user.manager ? {
      ...user.manager,
      aum_managed: (user.manager as any).aum_managed ? (user.manager as any).aum_managed.toString() : null
    } : null,
    client_manager: user.client_manager ? {
      ...user.client_manager,
      aum_managed: (user.client_manager as any).aum_managed ? (user.client_manager as any).aum_managed.toString() : null
    } : null
  };

  const responsePayload = { success: true, data: serializedUser };

  // Cache for 5 minutes
  try {
    await setCache(cacheKey, JSON.stringify(responsePayload), 300);
  } catch (err) {
    logger.warn(`[Auth] Failed to cache profile: ${err}`);
  }

  return res.json(responsePayload)
}






export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {

  const userId = req.user?.id;
  const token = req.cookies.refreshToken;

  if (!userId || !token) {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    return res.status(200).json({ success: true, message: "logged out successfully" });
  }


  const deleteResult = await prisma.refreshToken.deleteMany({
    where: {
      token,
      user_id: userId
    }
  });

  if (deleteResult.count === 0) {
    return next(createError(403, "This session has been revoked/logged out!"));
  }

  if (redisClient) {
    try {
      await Promise.all([
        redisClient.del(`user:profile:${userId}`),
        redisClient.del(`dashboard:${userId}`),
        redisClient.del(`manager_dashboard:${userId}`)
      ]);
      logger.info(`[Auth] Cleared session caches for user: ${userId}`);
    } catch (err) {
      logger.warn(`[Auth] Failed to clear caches on logout: ${err}`);
    }
  }

  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  return res.status(200).json({ success: true, message: "user logged out successfully" })

}



