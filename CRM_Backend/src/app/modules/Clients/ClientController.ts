import { NextFunction, Request, Response } from "express";
import { ClientServices } from "./ClientServices";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createClient = async(req:Request,res:Response,next:NextFunction)=>{

   try{
    const result = await ClientServices.createClientIntoDB(
        req.body,
        String(req.user?.id)
      );
  
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Client created successfully!",
        data: result,
      });
   }
   catch(err){
    console.log("error from client: ",err);
    next(err)
   }

}
const getClients = async(req:Request,res:Response,next:NextFunction)=>{

    try{
     const result = await ClientServices.getClientsFromDB(
         String(req.query?.search),
         String(req.user?.id)
       );
   
       sendResponse(res, {
         success: true,
         statusCode: httpStatus.CREATED,
         message: "Clients fetched successfully!",
         data: result,
       });
    }
    catch(err){
     console.log("error from client: ",err);
     next(err)
    }
 
 }
export const ClientControllers={
    createClient,
    getClients
}