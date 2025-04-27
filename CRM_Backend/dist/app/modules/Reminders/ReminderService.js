"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../Errors/ApiError"));
const date_fns_1 = require("date-fns");
const addReminderIntoDB = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("data: ", data, "\n", "id:", id);
    const { email, date, message } = data;
    const isUserExists = yield prisma_1.default.user.findFirst({
        where: {
            id: id,
        },
    });
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't exists!", "", "");
    }
    const client = yield prisma_1.default.clients.findFirst({
        where: {
            userId: id,
            email,
        },
    });
    if (!client) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Client not found for this user!", "", "");
    }
    const result = yield prisma_1.default.reminders.create({
        data: {
            userId: id,
            date,
            message,
            clientId: client.client_id,
        },
    });
    console.log({ result });
    return result;
});
const getRemindersFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Calculate the start and end dates of the current week
        const startOfWeekDate = (0, date_fns_1.startOfWeek)(new Date(), { weekStartsOn: 1 }); // Week starts on Monday
        const endOfWeekDate = (0, date_fns_1.endOfWeek)(new Date(), { weekStartsOn: 1 });
        // Query reminders within the date range of the current week
        const reminders = yield prisma_1.default.reminders.findMany({
            where: {
                userId,
                date: {
                    gte: startOfWeekDate, // Greater than or equal to the start of the week
                    lte: endOfWeekDate, // Less than or equal to the end of the week
                },
            },
        });
        // Check if there are any reminders due this week
        if (!reminders || reminders.length === 0) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No reminders found for this week.', '', '');
        }
        // Format the date and message for each reminder and return the summary
        const remindersSummary = reminders.map((reminder) => ({
            message: reminder.message,
            date: (0, date_fns_1.format)(new Date(reminder.date), 'yyyy-MM-dd'), // Format date in a readable format
        }));
        return remindersSummary;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message, '', '');
    }
});
exports.ReminderServices = {
    addReminderIntoDB,
    getRemindersFromDB
};
