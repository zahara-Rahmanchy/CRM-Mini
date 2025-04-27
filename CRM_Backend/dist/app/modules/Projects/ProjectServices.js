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
exports.ProjectServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../Errors/ApiError"));
const createProjectInDB = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, budget, deadline, status } = data;
    const isUserExists = yield prisma_1.default.user.findFirst({
        where: {
            id: userId,
        },
    });
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't exists!", "", "");
    }
    const isClientExists = yield prisma_1.default.clients.findFirst({
        where: {
            userId,
            email: data.clientEmail
        }
    });
    if (!isClientExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This client doesn't exists!", "", "");
    }
    const result = yield prisma_1.default.projects.create({
        data: {
            title,
            budget,
            deadline,
            status,
            client_id: isClientExists.client_id,
        },
    });
    return result;
});
// const getProjectsFromDB = async (userId: string, search?: string,status?:string) => {
//   const orConditions: any[] = [];
//   if (search && search.trim() !== "" && search!==undefined) {
//     orConditions.push({ title: { contains: search, mode: 'insensitive' } });
//   }
//   if (status && status.trim() !== ""&& search!==undefined) {
//     orConditions.push({ status: status.toUpperCase() as ProjectStatus });
//   }
//     const projects = await prisma.projects.findMany({
//       where: {
//         client:{
//             userId
//         },
//         ...(orConditions.length > 0 && { OR: orConditions }),
//       },
//       select: {
//         project_id:true,
//         client_id : true,
//         title: true,
//         budget: true,
//         deadline: true,
//         status: true,
//         client: {
//           select: {
//             name: true,
//           },
//         },
//       },
//       orderBy: {
//         deadline: 'desc',
//       },
//     });
//     return projects; 
//   };
const getProjectsFromDB = (userId, search, status) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("searhc: ", search, "\nstatus: ", status);
    const whereCondition = {
        client: {
            userId,
        },
    };
    if ((search !== undefined) && (search && search.trim() !== "")) {
        whereCondition.title = { contains: search, mode: 'insensitive' };
    }
    if ((status !== undefined) && (status && status.trim() !== "")) {
        whereCondition.status = status.toUpperCase();
    }
    const projects = yield prisma_1.default.projects.findMany({
        where: whereCondition,
        select: {
            project_id: true,
            client_id: true,
            title: true,
            budget: true,
            deadline: true,
            status: true,
            client: {
                select: {
                    name: true,
                },
            },
        },
        orderBy: {
            deadline: 'desc',
        },
    });
    return projects;
});
const updateProjectData = (userId, projectId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield prisma_1.default.user.findFirst({
        where: {
            id: userId,
        },
    });
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't exists!", "", "");
    }
    const isProjectExists = yield prisma_1.default.projects.findFirst({
        where: {
            project_id: projectId,
            client: {
                userId: userId
            }
        }
    });
    if (!isProjectExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This Project doesn't exists!", "", "");
    }
});
const deleteProjectFromDB = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isProject = yield prisma_1.default.projects.findFirst({
        where: {
            project_id: id,
            client: {
                userId
            }
        },
    });
    if (!isProject) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Client not found or unauthorized.");
    }
    // const result = await prisma.clients.delete({
    //   where: {
    //     client_id:id,
    //   },
    // });
    const result = yield prisma_1.default.$transaction([
        // prisma.interaction_logs.deleteMany({ where: { client_id: id } }),
        // prisma.reminders.deleteMany({ where: { client_id: id } }),
        prisma_1.default.projects.delete({
            where: {
                project_id: id,
                client: {
                    userId
                }
            },
        }),
    ]);
    console.log("Deleted project data", result);
    return result;
});
exports.ProjectServices = {
    createProjectInDB,
    getProjectsFromDB,
    updateProjectData,
    deleteProjectFromDB
};
