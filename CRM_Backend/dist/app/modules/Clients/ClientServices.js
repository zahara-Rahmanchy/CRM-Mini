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
exports.ClientServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../Errors/ApiError"));
const createClientIntoDB = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("data: ", data, "\n", "id:", id);
    const isUserExists = yield prisma_1.default.user.findFirst({
        where: {
            id: id,
        },
    });
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't exists!", "", "");
    }
    const isClientExists = yield prisma_1.default.clients.findFirst({
        where: {
            userId: id,
            email: data.email,
        },
    });
    console.log("isClientExists: ", isClientExists);
    if (isClientExists !== null) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "This client already exists!", "", "");
    }
    const result = yield prisma_1.default.clients.create({
        data: Object.assign(Object.assign({}, data), { userId: id }),
    });
    console.log({ result });
    return result;
});
//   get and also search based on name,email or company
const getClientsFromDB = (userId, search) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("userID: ", userId, "search: ", search);
    let whereCondition = {
        userId,
    };
    // if (search !== undefined && search.trim() !== "") {
    //   whereCondition = {
    //     userId,
    //     OR: [
    //       { name: { contains: search, mode: 'insensitive' } },
    //       { email: { contains: search, mode: 'insensitive' } },
    //       { company: { contains: search, mode: 'insensitive' } },
    //     ],
    //   };
    // }
    const clients = yield prisma_1.default.clients.findMany({
        where: whereCondition,
        orderBy: {
            createdAt: 'desc',
        },
    });
    console.log("clients: ", clients);
    return clients;
});
// const getClientsFromDB = async (userId: string,search?: string,) => {
//   console.log("userID: ",userId,"search: ",search)
//   const whereCondition: any = {
//     userId,
//   };
//   // Add search filters if search exists
//   if ((search !== undefined) && (search && search.trim() !== "")) {
//     whereCondition.OR = [
//       { name: { contains: search, mode: 'insensitive' } },
//       { email: { contains: search, mode: 'insensitive' } },
//       { company: { contains: search, mode: 'insensitive' } },
//     ];
//   }
//     const clients = await prisma.clients.findMany({
//       where: whereCondition,
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });
//     console.log("clients: ",clients)
//     return clients; 
//   };
//   update,first check email if same client email exists for this user then not
const updateClient = (clientId, userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield prisma_1.default.user.findFirst({
        where: {
            id: userId,
        },
    });
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't exists!", "", "");
    }
    if (data.email) {
        const existing = yield prisma_1.default.clients.findFirst({
            where: {
                userId,
                email: data.email,
                NOT: { client_id: clientId }, // Exclude current client
            },
        });
        if (existing) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, "Client with this email already exists!");
        }
    }
    const updatedClient = yield prisma_1.default.clients.update({
        where: {
            client_id: clientId
        },
        data,
    });
    return updatedClient;
});
//   delete
const deleteClientFromDB = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const clientWithProjects = yield prisma_1.default.clients.findFirst({
        where: {
            client_id: id,
            userId: userId,
        },
        include: {
            projects: true,
        },
    });
    if (!clientWithProjects) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Client not found or unauthorized.");
    }
    if (clientWithProjects.projects.length > 0) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "This client has associated projects. Please delete them first.");
    }
    // const result = await prisma.clients.delete({
    //   where: {
    //     client_id:id,
    //   },
    // });
    const result = yield prisma_1.default.$transaction([
        // prisma.interaction_logs.deleteMany({ where: { client_id: id } }),
        // prisma.reminders.deleteMany({ where: { client_id: id } }),
        prisma_1.default.clients.delete({ where: { userId, client_id: id } }),
    ]);
    console.log("Deleted client and related data", result);
    return result;
});
exports.ClientServices = {
    createClientIntoDB,
    getClientsFromDB,
    updateClient,
    deleteClientFromDB
};
