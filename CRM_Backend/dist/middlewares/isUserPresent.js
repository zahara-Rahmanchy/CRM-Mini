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
exports.isUserPresent = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../shared/prisma"));
const ApiError_1 = __importDefault(require("../app/Errors/ApiError"));
const isUserPresent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isPresent = yield prisma_1.default.user.findFirst({
        where: {
            id: String((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)
        }
    });
    if (!isPresent) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized Access", "", "User doesn't exist");
    }
    next();
});
exports.isUserPresent = isUserPresent;
