import { NextFunction, Request, Response } from "express";

import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { getMetaDataFromDB } from "./MetaServices";

export const MetaData= async (req:Request,res:Response,next:NextFunction) => {
    console.log("user controller:", req.body, "id", req.params);
    try {
        
        const result = await getMetaDataFromDB(req.user?.id);
    
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Dashboard data fetched successfully",
            data: result,
        });
    }
        catch(err){
        console.log("error updating client: ",err);
        next(err)
        }
} 