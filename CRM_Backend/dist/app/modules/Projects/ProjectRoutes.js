"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const client_1 = require("@prisma/client");
const ProjectValidation_1 = require("./ProjectValidation");
const ProjectController_1 = require("./ProjectController");
const router = express_1.default.Router();
router.post("/project", (0, auth_1.default)(client_1.userRoles.User), (0, validateRequest_1.default)(ProjectValidation_1.ProjectValidation.createProjectSchema), 
// isUserPresent,
ProjectController_1.ProjectController.createClient);
router.get("/get-projects", (0, auth_1.default)(client_1.userRoles.User), ProjectController_1.ProjectController.getClients);
router.patch("/update-project/:projectId", (0, auth_1.default)(client_1.userRoles.User), 
// isUserPresent,
ProjectController_1.ProjectController.updateProject);
router.delete("/delete-project/:projectId", (0, auth_1.default)(client_1.userRoles.User), 
// isUserPresent,
ProjectController_1.ProjectController.deleteProject);
exports.ProjectRoutes = router;
