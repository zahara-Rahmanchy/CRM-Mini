import express from "express";
import { AuthController } from "./AuthController";

const router = express.Router();


router.post("/login",AuthController.loginUser)