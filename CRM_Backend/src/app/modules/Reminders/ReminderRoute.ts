import express from "express"
import validateRequest from "../../../middlewares/validateRequest";
import auth from "../../../middlewares/auth";
import { userRoles } from "@prisma/client";
import { ReminderController } from "./ReminderController";

const router = express.Router();

router.post("/add-reminder",auth(userRoles.User),
//   validateRequest(clientValidationSchemas.clientInputValidation),
  ReminderController.addReminder
)

router.post("/get-reminders",auth(userRoles.User),
//   validateRequest(clientValidationSchemas.clientInputValidation),
  ReminderController.getReminders
)
export const ReminderRoutes = router;