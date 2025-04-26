import { z } from "zod";

const clientInputValidation = z.object({
    name:z.string({required_error:"Name of client is required"}),
    email:z.string().email("Valid email is required"),
    phone: z
    .string()
    .min(10)
    .max(15)
    .regex(/^\+?[0-9]{10,15}$/, {
      message: "Invalid phone number format",
    }),
    company: z.string().optional(),
    notes: z.string().optional()

})


 const updateClientSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  notes: z.string().optional(),
});


export const clientValidationSchemas={
    clientInputValidation,
    updateClientSchema
}