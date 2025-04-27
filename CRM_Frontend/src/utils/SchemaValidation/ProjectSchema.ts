import { z } from "zod";
export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  budget: z.number().min(0, "Budget must be greater than 0"),
  deadline: z.string({
    message: "Deadline must be a valid datetime.",
  }),// Ensuring it's a valid Date
  status: z.enum([
  "DRAFT",
  "CANCELLED",
  "COMPLETED",
  "IN_PROGRESS",
  "NEGOTIATION",
  "ON_HOLD",
  "PROPOSAL_SENT",
  "WAITING_ON_CLIENT"
  ])
})
export const projectUpdateSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
budget: z.number().min(0, "Budget must be greater than 0").optional(),
deadline: z.string().datetime({
  message: "Deadline must be a valid datetime.",
}).optional(),
status: z.enum([
   "DRAFT",
   "CANCELLED",
   "COMPLETED",
   "IN_PROGRESS",
   "NEGOTIATION",
   "ON_HOLD",
   "PROPOSAL_SENT",
   "WAITING_ON_CLIENT"
  ]).optional()
})

export type ProjectFormData = z.infer<typeof projectUpdateSchema>;
export type ProjectAddFormData = z.infer<typeof projectSchema>;