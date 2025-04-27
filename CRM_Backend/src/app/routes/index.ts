import express from "express";
import { UserRoutes } from "../modules/User/UserRoute";
import { AuthRoutes } from "../modules/Auth/AuthRoute";
import { ClientRoutes } from "../modules/Clients/ClientRoutes";
import { ProjectRoutes } from "../modules/Projects/ProjectRoutes";
import { MetaRoutes } from "../modules/DashboardMetaData/MetaRoute";



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
  {
    path: "/",
    route: ProjectRoutes,
  },
  {
    path: "/",
    route: MetaRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
