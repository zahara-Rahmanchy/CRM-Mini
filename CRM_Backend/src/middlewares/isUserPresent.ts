import httpStatus from "http-status";
import prisma from "../shared/prisma"
import ApiError from "../app/Errors/ApiError";
import {NextFunction, Request, Response} from "express";

export const isUserPresent = async (req: Request, res: Response, next: NextFunction) => {
    const isPresent = await prisma.user.findFirst({
        where: {
            id: String(req.user?.userId)
        }
    });

    if (!isPresent) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access", "", "User doesn't exist");
    }

    next();
};
