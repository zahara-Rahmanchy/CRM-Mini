import express from "express"
import validateRequest from "../../../middlewares/validateRequest";
import { userValidationSchema } from "./UserValidation";
import { UserControllers } from "./UserController";


const router = express.Router();

router.post("/register",
    validateRequest(userValidationSchema.registerValidationSchema)
    ,UserControllers.createUser
)

export const UserRoutes = router;