import { z } from "zod";


const registerSchema = z.object({
    email: z.email({ message: "Invalid email" }),
    password: z.string({ error: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" }).regex(/\d/, { message: "Password must contain at least one number" }),
    name: z.string({ error: "Name is required" }).min(1, { message: "Name is required" }).max(20, { message: "Name must not exceed 20 characters long" }),
    username: z.string({ error: "Username is required" }).min(3, { message: "Username must be at least 3 characters long" }).max(20, { message: "Username must not exceed 20 characters long" }),
    role: z.enum(["CLIENT", "MANAGER"]).optional(),
})


const loginSchema = z.object({
    email: z.email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }).regex(/\d/, { message: "Password must contain at least one number" }),
})


const updateSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }).regex(/\d/, { message: "Password must contain at least one number" }),
    name: z.string().min(1, { message: "Name is required" }).max(20, { message: "Name must not exceed 20 characters long" }),
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }).max(20, { message: "Username must not exceed 20 characters long" }),
    email: z.email({ message: "Invalid email" }),
    role: z.enum(["CLIENT", "MANAGER"]).optional(),
})

const verifyEmailSchema = z.object({
    email: z.email({ message: "Invalid email" }),
    otp: z.string().length(6, { message: "OTP must be exactly 6 digits" }).regex(/^\d+$/, { message: "OTP must contain only numbers" }),
});

export { loginSchema, registerSchema, updateSchema, verifyEmailSchema }
