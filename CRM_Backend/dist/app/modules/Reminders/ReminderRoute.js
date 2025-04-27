"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const client_1 = require("@prisma/client");
const ReminderController_1 = require("./ReminderController");
const router = express_1.default.Router();
router.post("/add-reminder", (0, auth_1.default)(client_1.userRoles.User), 
//   validateRequest(clientValidationSchemas.clientInputValidation),
ReminderController_1.ReminderController.addReminder);
router.post("/get-reminders", (0, auth_1.default)(client_1.userRoles.User), 
//   validateRequest(clientValidationSchemas.clientInputValidation),
ReminderController_1.ReminderController.getReminders);
exports.ReminderRoutes = router;
