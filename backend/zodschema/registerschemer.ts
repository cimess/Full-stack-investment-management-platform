import { z } from "zod";
import { Roles } from "../prisma/generated/index.js";


const registerSchema=z.object({
    email: z.email({ message: "Invalid email"}),
    password:z.string({error:"Password is required"}).min(8,{message:"Password must be at least 8 characters long"}).regex(/\d/,{message:"Password must contain at least one number"}).max(16,{message:"Password must not exceed 16 characters long"}),
    name:z.string({error:"Name is required"}).min(1,{message:"Name is required"}).max(20,{message:"Name must not exceed 20 characters long"}),
    username:z.string({error:"Username is required"}).min(3,{message:"Username must be at least 3 characters long"}).max(20,{message:"Username must not exceed 20 characters long"}),
    role:z.enum(Roles).optional()
})


const loginSchema=z.object({
    email:z.email({message:"Invalid email"}),
    password:z.string().min(8,{message:"Password must be at least 8 characters long"}).regex(/\d/,{message:"Password must contain at least one number"}).max(16,{message:"Password must not exceed 16 characters long"}),
})
const loginManagerSchema=z.object({
    email:z.email({message:"Invalid email"}),
    password:z.string().min(8,{message:"Password must be at least 8 characters long"}).regex(/\d/,{message:"Password must contain at least one number"}).max(16,{message:"Password must not exceed 16 characters long"}),
    token_access:z.string({error:"Token is required"})
})

const updateSchema=z.object({
   password:z.string().min(8,{message:"Password must be at least 8 characters long"}).regex(/\d/,{message:"Password must contain at least one number"}).max(16,{message:"Password must not exceed 16 characters long"}),
    name:z.string().min(1,{message:"Name is required"}).max(20,{message:"Name must not exceed 20 characters long"}),
    username:z.string().min(3,{message:"Username must be at least 3 characters long"}).max(20,{message:"Username must not exceed 20 characters long"}),
    email:z.email({message:"Invalid email"}),
})

export {loginSchema,registerSchema,updateSchema,loginManagerSchema}
