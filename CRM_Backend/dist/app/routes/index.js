"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRoute_1 = require("../modules/User/UserRoute");
const AuthRoute_1 = require("../modules/Auth/AuthRoute");
const ClientRoutes_1 = require("../modules/Clients/ClientRoutes");
const ProjectRoutes_1 = require("../modules/Projects/ProjectRoutes");
const MetaRoute_1 = require("../modules/DashboardMetaData/MetaRoute");
const ReminderRoute_1 = require("../modules/Reminders/ReminderRoute");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/",
        route: UserRoute_1.UserRoutes
    },
    {
        path: "/",
        route: AuthRoute_1.AuthRoutes,
    },
    {
        path: "/",
        route: ClientRoutes_1.ClientRoutes,
    },
    {
        path: "/",
        route: ProjectRoutes_1.ProjectRoutes,
    },
    {
        path: "/",
        route: MetaRoute_1.MetaRoutes,
    },
    {
        path: "/",
        route: ReminderRoute_1.ReminderRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
