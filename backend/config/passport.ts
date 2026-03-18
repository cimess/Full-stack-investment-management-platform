import passport from "passport";
import { Strategy as GoogleStrategy, } from "passport-google-oauth20";
import type { Profile } from "passport-google-oauth20"
import { prisma } from "../lib/prisma.js";
import dotenv from "dotenv";
import logger from "../winstonlog/logger.js";
import type { Request } from "express";
import https from "https";
dotenv.config();

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.NODE_ENV === "production"
      ? "https://novalinvest.onrender.com/api/auth/google/callback"
      : "http://localhost:4000/api/auth/google/callback",
    passReqToCallback: true,
    proxy: true,
    customHeaders: { "User-Agent": "CimessInvest-NodeJS" }
  },
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user?: any) => void
  ) => {
    try {
      const email = profile.emails?.[0]?.value;
      if (!profile.id) throw new Error("Invalid Google profileID");
      if (!email) throw new Error("Email not found in Google profile");

      const loggedInUser = req.user?.id;
      if (loggedInUser) {
        try {
          const user = await prisma.user.findUnique({ where: { id: loggedInUser } });

          if (user?.email !== email) {
            logger.warn(`Logged in user email (${user?.email}) does not match Google profile email (${email}). Possible account mismatch or security issue.`);
            return done(new Error("Logged in user email does not match Google profile email."), undefined);
          }
          const updatedUser = await prisma.user.update({
            where: { id: loggedInUser },
            data: {
              googleId: profile.id,
              isVerified: true
            }
          });
          logger.info(`Linked Google account (${email}) to existing user ID ${loggedInUser}.`);
          return done(null, updatedUser);
        } catch (err) {
          logger.error("Error fetching logged in user during Google OAuth: ", err);
          return done(err, undefined);
        }
      }

      const userByGoogle = await prisma.user.findUnique({
        where: { googleId: profile.id }
      });
      const userByEmail = await prisma.user.findUnique({
        where: { email: email }
      });

      if (!userByGoogle && userByEmail) {
        await prisma.user.update({
          where: { id: userByEmail.id },
          data: {
            googleId: profile.id,
            isVerified: true
          }
        });
        logger.info(`Linked Google account (${email}) to existing user ID ${userByEmail.id} based on email match.`);
        return done(null, userByEmail);
      }

      const username = profile.displayName?.split(" ")[0] || profile.emails?.[0]?.value?.split("@")[0] || "user";

      if (userByGoogle) {
        return done(null, userByGoogle);
      }

        const user = await prisma.user.create({
          data: {
            email,
            fullname: profile.displayName,
            googleId: profile.id,
            username,
            isVerified: true,
            verificationToken: null,
            verificationTokenExpires: null
          },
        });
        logger.info('Google OAuth successful for user: ', user);
        (user as any).isNewUser = true;
        return done(null, user);
    } catch (err) {
      return done(err, undefined);
    }
  }
);

// Inject custom HTTPS Agent with 60s timeout to resolve ETIMEDOUT on slow networks
(strategy as any)._oauth2.setAgent(new https.Agent({ 
  keepAlive: true, 
  timeout: 60000 
}));

export default passport.use(strategy);
