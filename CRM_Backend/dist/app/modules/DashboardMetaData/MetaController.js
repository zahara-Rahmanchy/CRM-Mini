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
exports.MetaData = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const MetaServices_1 = require("./MetaServices");
const MetaData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("user controller:", req.body, "id", req.params);
    try {
        const result = yield (0, MetaServices_1.getMetaDataFromDB)((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Dashboard data fetched successfully",
            data: result,
        });
    }
    catch (err) {
        console.log("error updating client: ", err);
        next(err);
    }
});
exports.MetaData = MetaData;
