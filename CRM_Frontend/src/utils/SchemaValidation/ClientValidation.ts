import { z } from 'zod';

export const clientUpdateSchema = z.object({
    name: z.string().min(1, 'Name is required').optional(),
    email: z.string().email('Invalid email').min(1, 'Email is required').optional(),
    phone: z.string().min(9, 'Phone number is required').optional(),
    company: z.string().optional(),
    notes: z.string().optional(),
  });
  
 export type ClientFormData = z.infer<typeof clientUpdateSchema>;