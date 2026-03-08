import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import type { VerifyErrors } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    roles: string;
  };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {

  // 2. Extract the token from the Authorization header
  // Format: "Bearer <token>"

  const token = req.cookies.accessToken;

  // 3. If there is no token, return a 401 Unauthorized error
  if (!token) {
    return next(createError(401, "TOKEN_NOT_FOUND"));
  }

  // 4. Verify the token using your Secret Key
  jwt.verify(token, process.env.JWT_SECRET_ACCESSTOKEN as string, (err: VerifyErrors | null, decodedPayload: any) => {
    // 5. If verification fails (expired or fake token)
    if (err) {
      return next(createError(401, "TOKEN_EXPIRED_OR_INVALID"));
    }

    // 6. If successful, attach the user data to the request object
    // Now the next function (the controller) can see who "req.user" is
    req.user = {
      id: decodedPayload.id,
      roles: decodedPayload.roles
    };

    // 7. Move to the next checkpoint (Middleware or Controller)
    next();
  });
};

export const verifyTokenSecret = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_REFRESHTOKEN as string) as { id: string; roles: string };
  } catch (err) {
    return null;
  }
};

export const generateRefreshToken = (payload: { id: string; roles: string }) => {

  return jwt.sign(payload, process.env.JWT_SECRET_REFRESHTOKEN as string, {
    expiresIn: "7d"
  })
}

export const generateAccessToken = (payload: { id: string; roles: string }) => {

  return jwt.sign(payload, process.env.JWT_SECRET_ACCESSTOKEN as string, {
    expiresIn: "10m"
  })
}

