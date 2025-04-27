"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientValidationSchemas = void 0;
const zod_1 = require("zod");
const clientInputValidation = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Name of client is required" }),
    email: zod_1.z.string().email("Valid email is required"),
    phone: zod_1.z
        .string()
        .min(10)
        .max(15)
        .regex(/^\+?[0-9]{10,15}$/, {
        message: "Invalid phone number format",
    }),
    company: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional()
});
const updateClientSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().optional(),
    company: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
});
exports.clientValidationSchemas = {
    clientInputValidation,
    updateClientSchema
};
