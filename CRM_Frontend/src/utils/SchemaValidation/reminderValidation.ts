import { z } from 'zod';

export const ReminderSchema = z.object({
 
  email: z.string().email({ message: "Invalid email address" }).nonempty({ message: "Client's Email is required" }),
  date: z.string().datetime({ message: "Enter a date to get reminder" }).nonempty({ message: "Password is required" }),
  note: z.string().nonempty({ message: "Note is required" }),
});


export type ReminderFormType = z.infer<typeof ReminderSchema>;