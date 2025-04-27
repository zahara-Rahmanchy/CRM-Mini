"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const UserValidation_1 = require("./UserValidation");
const UserController_1 = require("./UserController");
const router = express_1.default.Router();
router.post("/register", (0, validateRequest_1.default)(UserValidation_1.userValidationSchema.registerValidationSchema), UserController_1.UserControllers.createUser);
exports.UserRoutes = router;
