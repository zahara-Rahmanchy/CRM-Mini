import { z } from 'zod';

const loginValidation = z.object({

  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const authValidationSchema = {
    loginValidation
}