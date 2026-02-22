import type {AuthRequest} from "../middlewear/auth.js";
import type {Response,NextFunction} from "express";
import createError from "http-errors";



export const authorise=(allowedRoles:string[])=>{

  return (req:AuthRequest,res:Response,next:NextFunction)=>{

    const userRole=req.user?.roles;

    if(!userRole){
      return next(createError(401,"Unauthorized"));
    }

    if(!allowedRoles.includes(userRole)){
      return next(createError(403,"Forbidden"));
    }

    next();
  }

}

