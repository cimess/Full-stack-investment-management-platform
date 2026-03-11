import type {AuthRequest} from "../middlewear/auth.js";
import type {Response,NextFunction} from "express";
import createError from "http-errors";
import type{ RequestHandler } from "express";


export const authorise=(allowedRoles:string[]):RequestHandler=>{

  return (req,res:Response,next:NextFunction)=>{

    
    const userRole=req.user?.roles;

    if(!userRole){
      return next(createError(401,"Unauthorized"));
    }

    if(!allowedRoles.includes(userRole)){
      console.log(userRole)
      return next(createError(403,"Forbidden"));
    }

    next();
  }

}

