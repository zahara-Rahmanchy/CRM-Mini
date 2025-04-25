import { z } from 'zod';

const registerValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const userValidationSchema = {
    registerValidationSchema
}