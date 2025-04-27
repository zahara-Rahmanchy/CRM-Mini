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
exports.ReminderController = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const ReminderService_1 = require("./ReminderService");
const addReminder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield ReminderService_1.ReminderServices.addReminderIntoDB(req.body, String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id));
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.CREATED,
            message: "Reminder created successfully!",
            data: result,
        });
    }
    catch (err) {
        console.log("error from client: ", err);
        next(err);
    }
});
const getReminders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    console.log("req.eury: ", req.user);
    try {
        const result = yield ReminderService_1.ReminderServices.getRemindersFromDB(String((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id));
        console.log("result con: ", result);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.CREATED,
            message: "Reminders fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        console.log("error from client: ", err);
        next(err);
    }
});
exports.ReminderController = {
    addReminder,
    getReminders
};
