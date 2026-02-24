import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import type { ErrorRequestHandler } from "express";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json({limit:"10mb"}));
app.use(cors({

  credentials:true,
}));
app.use(helmet());
app.use(rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
}));
app.use("/api",router);

const errorHandler:ErrorRequestHandler=(err,req,res,next)=>{
  const statusCode=err.statusCode|| err.status || 500;
  const message=err.message||err.error||"Internal Server Error";
  if(statusCode===500){
   return res.status(500).json({success:false,statusCode,message:'internal server error'});
  }
  return res.status(statusCode).json({success:false,statusCode,message});
}

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
