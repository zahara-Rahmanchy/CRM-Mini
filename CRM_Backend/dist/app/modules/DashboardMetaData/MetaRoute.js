"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const client_1 = require("@prisma/client");
;
const MetaController_1 = require("./MetaController");
const router = express_1.default.Router();
router.get("/meta-data", (0, auth_1.default)(client_1.userRoles.User), 
//   isUserPresent,
MetaController_1.MetaData);
exports.MetaRoutes = router;
