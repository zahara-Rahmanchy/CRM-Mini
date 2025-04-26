import express from "express"
import validateRequest from "../../../middlewares/validateRequest";
import auth from "../../../middlewares/auth";
import { userRoles } from "@prisma/client";
import { clientValidationSchemas } from "./ClientValidation";
import { ClientControllers } from "./ClientController";



const router = express.Router();

router.post("/client",auth(userRoles.User),
  validateRequest(clientValidationSchemas.clientInputValidation),
  ClientControllers.createClient
)

// looged in user clients-- specific clients of specific user
router.get("/get-clients",auth(userRoles.User),
  ClientControllers.getClients
)


router.delete("/delete-client/:clientId",auth(userRoles.User),
  ClientControllers.deleteClient
)
export const ClientRoutes = router;