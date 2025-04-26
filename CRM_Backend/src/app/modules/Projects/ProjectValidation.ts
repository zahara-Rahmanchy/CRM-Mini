import { ProjectStatus } from "@prisma/client";
import { z } from "zod";

 const createProjectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    budget: z.number().min(0, "Budget must be greater than 0"),
    deadline: z.string().datetime({
        message: "Deadline must be a valid datetime.",
      }), // Ensuring it's a valid Date
    status: z.enum([
       ProjectStatus.DRAFT,
       ProjectStatus.CANCELLED,
       ProjectStatus.COMPLETED,
       ProjectStatus.IN_PROGRESS,
       ProjectStatus.NEGOTIATION,
       ProjectStatus.ON_HOLD,
       ProjectStatus.PROPOSAL_SENT,
       ProjectStatus.WAITING_ON_CLIENT
      ]), // Enum validation for status
    clientEmail: z.string().email("Invalid email format"),
  });

export const ProjectValidation={
    createProjectSchema
}