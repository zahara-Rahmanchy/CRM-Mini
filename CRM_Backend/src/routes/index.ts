import express from "express";
import { UserRoutes } from "../app/modules/User/UserRoute";
import { AuthRoutes } from "../app/modules/Auth/AuthRoute";
import { ClientRoutes } from "../app/modules/Clients/ClientRoutes";



const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: UserRoutes
  },
  {
    path: "/",
    route: AuthRoutes,
  },
  {
    path: "/",
    route: ClientRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
