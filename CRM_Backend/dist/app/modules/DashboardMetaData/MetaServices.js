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
exports.getMetaDataFromDB = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getMetaDataFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const totalClients = yield prisma_1.default.clients.count({
        where: {
            userId
        }
    });
    const totalProjects = yield prisma_1.default.projects.count({
        where: {
            client: {
                userId
            }
        }
    });
    const projectsByStatus = (yield prisma_1.default.projects.groupBy({
        by: ["status"],
        _count: {
            project_id: true,
        },
        where: {
            client: {
                userId: userId, // Filter by userId
            },
        },
    })).map(({ status, _count }) => ({ status, count: _count.project_id }));
    const projectCounts = yield prisma_1.default.projects.groupBy({
        by: ['status'],
        _count: {
            status: true,
        },
        where: {
            client: {
                userId: userId, // Filter: projects whose client's userId matches
            },
        },
    });
    return {
        totalClients,
        totalProjects,
        projectsByStatus,
        projectCounts
    };
});
exports.getMetaDataFromDB = getMetaDataFromDB;
