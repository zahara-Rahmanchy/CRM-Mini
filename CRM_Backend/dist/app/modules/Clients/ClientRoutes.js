"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const client_1 = require("@prisma/client");
const ClientValidation_1 = require("./ClientValidation");
const ClientController_1 = require("./ClientController");
const router = express_1.default.Router();
router.post("/client", (0, auth_1.default)(client_1.userRoles.User), (0, validateRequest_1.default)(ClientValidation_1.clientValidationSchemas.clientInputValidation), ClientController_1.ClientControllers.createClient);
// looged in user clients-- specific clients of specific user
router.get("/get-clients", (0, auth_1.default)(client_1.userRoles.User), ClientController_1.ClientControllers.getClients);
router.patch("/update-client/:clientId", (0, auth_1.default)(client_1.userRoles.User), (0, validateRequest_1.default)(ClientValidation_1.clientValidationSchemas.updateClientSchema), ClientController_1.ClientControllers.updateClientData);
router.delete("/delete-client/:clientId", (0, auth_1.default)(client_1.userRoles.User), ClientController_1.ClientControllers.deleteClient);
exports.ClientRoutes = router;
