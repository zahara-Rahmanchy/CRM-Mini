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
    console.log("req.eury: ",req.user)
    try{
     const result = await ClientServices.getClientsFromDB(
         String(req?.user?.id),
         String(req.query?.search),
         
       );
        console.log("result con: ",result)
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

 const updateClientData = async (req:Request,res:Response,next:NextFunction) => {
    console.log("user controller:", req.body, "id", req.params);
    try {
        
        const result = await ClientServices.updateClient(
            req.params.clientId,
            String(req.user?.id),
            req.body

        );
    
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Client data updated successfully",
            data: result,
        });
    }
        catch(err){
        console.log("error updating client: ",err);
        next(err)
        }
}

 const deleteClient = async (req:Request,res:Response,next:NextFunction) => {
    console.log("user controller:", req.body, "id", req.params);
    try {

        const result = await ClientServices.deleteClientFromDB(
            req.params.client_id,
            String(req.user?.id),
        );
    
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Client data deleted successfully",
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
    getClients,
    updateClientData,
    deleteClient
}