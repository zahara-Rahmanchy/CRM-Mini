"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createProjectSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    budget: zod_1.z.number().min(0, "Budget must be greater than 0"),
    deadline: zod_1.z.string().datetime({
        message: "Deadline must be a valid datetime.",
    }), // Ensuring it's a valid Date
    status: zod_1.z.enum([
        client_1.ProjectStatus.DRAFT,
        client_1.ProjectStatus.CANCELLED,
        client_1.ProjectStatus.COMPLETED,
        client_1.ProjectStatus.IN_PROGRESS,
        client_1.ProjectStatus.NEGOTIATION,
        client_1.ProjectStatus.ON_HOLD,
        client_1.ProjectStatus.PROPOSAL_SENT,
        client_1.ProjectStatus.WAITING_ON_CLIENT
    ]), // Enum validation for status
    clientEmail: zod_1.z.string().email("Invalid email format"),
});
exports.ProjectValidation = {
    createProjectSchema
};
