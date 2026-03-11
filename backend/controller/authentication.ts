import createError from "http-errors";
import { loginSchema, registerSchema, verifyEmailSchema } from "../zodschema/registerschemer.js";
import { prisma } from "../lib/prisma.js"
import logger from "../winstonlog/logger.js";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendEmail } from "../services/emailService.js";
import { generateAccessToken, generateRefreshToken, verifyTokenSecret } from "../middlewear/auth.js";
import type { NextFunction } from "express";




export const googleAuth=async (req: Request, res:Response) => {

    const user = req.user as { id: string; roles: string; email: string; username: string; fullname: string; manager_id: string | null ;isVerified:boolean};

    const oldRefreshToken = req.cookies?.refreshToken;


    if (oldRefreshToken) {
      await prisma.refreshToken.deleteMany({
        where: {
          user_id:user?.id,
          token: oldRefreshToken
        }
      });
    }
    if(!user.isVerified){
      await prisma.user.update({
        where:{id:user.id},
        data:{isVerified:true}
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
    const { id, roles, username, fullname ,email,manager_id:managerId} = user
    // After successful OAuth, set cookies and redirect to frontend dashboard
    return res.redirect(`${process.env.FRONTEND_URL}/dashboard`);

  }



export const registerUser = async (req: Request, res: Response, next: NextFunction) => {

  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return next(createError(400, result.error.issues[0]?.message as string));
  }
  const { username, name, password, email } = result.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  const testCode = '123456'

  try {
    // const emailResponse = await sendEmail(
    //   email,
    //   "Verify your Nova Invest Account",
    //   `Your verification code is: ${otp}`
    // );
    // if (!emailResponse.success) {
    //   return next(createError(500, "Failed to send verification email"));
    // }
    // const user = await prisma.user.create({
    //   data: {
    //     username: username,
    //     fullname: name,
    //     password: hashedPassword,
    //     email: email,
    //     roles: 'USER',
    //     verificationToken: otp,
    //     verificationTokenExpires: otpExpires
    //   }
    // })



    // logger.info('user created', user)
    // return res.status(201)
    //   .json({
    //     success: true, message: "user created successfully. Please check your email to verify your account."
    //   })



    const user=await prisma.user.create({
      data:{
        email,
        fullname:name+' '+username,
        password:hashedPassword,
        username,
        roles:'USER',
        isVerified:false,
        verificationToken:null,
        verificationTokenExpires:null
      }
    })

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
 
    // After successful OAuth, set cookies and redirect to frontend dashboard
    return res.redirect(`${process.env.FRONTEND_URL}/dashboard`);

  } catch (err: any) {
    logger.error(err);
    if (err.code === 'P2002') {
      return next(createError(409, "Email already exists"));
    }
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

    logger.info(`User email verified: ${user.email}`);
    return res.status(200).json({ success: true, message: "Email verified successfully" });
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
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
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
      if (!user.isVerified) {
        return next(createError(403, "Please verify your email address to log in"));
      }
      if(!user.password){
        return next(createError(401, "This account is registered via Google OAuth. Please log in with Google."));  
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return next(createError(401, "invalid credentials"));
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
  const user = await prisma.user.findUnique({
    where: { id: user_logged_in.id },
    select: {
      roles: true,
      fullname: true,
      email: true,
      isVerified:true

    }
  })
  if (!user) {
    return next(createError(401, "Unauthorized"));
  }
  return res.json({ success: true, data: user })
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

  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  return res.status(200).json({ success: true, message: "user logged out successfully" })

}



