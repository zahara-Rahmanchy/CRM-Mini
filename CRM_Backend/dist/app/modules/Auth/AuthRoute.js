"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("./AuthController");
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const AuthValidation_1 = require("./AuthValidation");
const router = express_1.default.Router();
router.post("/login", (0, validateRequest_1.default)(AuthValidation_1.authValidationSchema.loginValidation), AuthController_1.AuthController.loginUser);
exports.AuthRoutes = router;
