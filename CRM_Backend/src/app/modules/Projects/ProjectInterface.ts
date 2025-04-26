import { ProjectStatus } from "@prisma/client";

export interface CreateProjectBody {
    title: string;
    budget: number;
    deadline: Date;
    status: ProjectStatus
    clientEmail: string;
  };
  