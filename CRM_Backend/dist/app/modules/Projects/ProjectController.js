"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const ProjectServices_1 = require("./ProjectServices");
const createClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield ProjectServices_1.ProjectServices.createProjectInDB(String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id), req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.CREATED,
            message: "Project created successfully!",
            data: result,
        });
    }
    catch (err) {
        console.log("error from Project: ", err);
        next(err);
    }
});
const getClients = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    try {
        const result = yield ProjectServices_1.ProjectServices.getProjectsFromDB(String((_b = req.user) === null || _b === void 0 ? void 0 : _b.id), String((_c = req.query) === null || _c === void 0 ? void 0 : _c.search), (_d = req.query) === null || _d === void 0 ? void 0 : _d.status);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.CREATED,
            message: "Projects fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        console.log("error from client: ", err);
        next(err);
    }
});
const updateProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    console.log("user controller:", req.body, "id", req.params);
    try {
        const result = yield ProjectServices_1.ProjectServices.updateProjectData(String((_e = req.user) === null || _e === void 0 ? void 0 : _e.id), req.params.projectId, req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Project data updated successfully",
            data: result,
        });
    }
    catch (err) {
        console.log("error updating client: ", err);
        next(err);
    }
});
const deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    console.log("user controller:", req.body, "id", req.params);
    try {
        const result = yield ProjectServices_1.ProjectServices.deleteProjectFromDB(req.params.projectId, String((_f = req.user) === null || _f === void 0 ? void 0 : _f.id));
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Project data deleted successfully",
            data: result,
        });
    }
    catch (err) {
        console.log("error updating client: ", err);
        next(err);
    }
});
exports.ProjectController = {
    createClient,
    getClients,
    updateProject,
    deleteProject
};
