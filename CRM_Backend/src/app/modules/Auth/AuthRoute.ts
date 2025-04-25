import express from "express";
import { AuthController } from "./AuthController";
import validateRequest from "../../../middlewares/validateRequest";
import { authValidationSchema } from "./AuthValidation";

const router = express.Router();


router.post("/login",
    validateRequest(authValidationSchema.loginValidation),
    AuthController.loginUser)


export const AuthRoutes = router;