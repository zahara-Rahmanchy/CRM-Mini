import express from "express"

import auth from "../../../middlewares/auth";
import { userRoles } from "@prisma/client";
;
import { isUserPresent } from "../../../middlewares/isUserPresent";
import { MetaData } from "./MetaController";

const router = express.Router();

router.get("/meta-data",
    auth(userRoles.User),
//   isUserPresent,
  MetaData
)

export const MetaRoutes = router;