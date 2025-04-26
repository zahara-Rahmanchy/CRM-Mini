import express from "express"
import validateRequest from "../../../middlewares/validateRequest";
import auth from "../../../middlewares/auth";
import { userRoles } from "@prisma/client";
import { ProjectValidation } from "./ProjectValidation";
import { ProjectController } from "./ProjectController";
import { isUserPresent } from "../../../middlewares/isUserPresent";

const router = express.Router();

router.post("/project",auth(userRoles.User),
  validateRequest(ProjectValidation.createProjectSchema),
  isUserPresent,
  ProjectController.createClient
)

router.get("/get-projects",auth(userRoles.User),
  ProjectController.getClients
)

router.patch("/update-project/:projectId",auth(userRoles.User),
  isUserPresent,
  ProjectController.updateProject
)

router.delete("/delete-project/:projectId",auth(userRoles.User),
  isUserPresent,
  ProjectController.deleteProject
)