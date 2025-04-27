// utils/validationSchemas.ts
import { z } from 'zod';

// Define Zod schema for registration form validation
export const registerSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }).nonempty({ message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }).nonempty({ message: "Email is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }).nonempty({ message: "Password is required" }),
    confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters long" }).nonempty({ message: "Confirm Password is required" }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // the path where the error should appear
  });
// Define Zod schema for form validation
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).nonempty({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }).nonempty({ message: "Password is required" }),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;