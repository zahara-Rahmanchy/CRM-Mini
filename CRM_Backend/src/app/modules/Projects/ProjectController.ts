import { NextFunction, Request, Response } from "express";

import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ProjectServices } from "./ProjectServices";

const createClient = async(req:Request,res:Response,next:NextFunction)=>{

    try{
     const result = await ProjectServices.createProjectInDB(
         String(req.user?.id),
         req.body,
       );
   
       sendResponse(res, {
         success: true,
         statusCode: httpStatus.CREATED,
         message: "Project created successfully!",
         data: result,
       });
    }
    catch(err){
     console.log("error from Project: ",err);
     next(err)
    }
 
 }
 const getClients = async(req:Request,res:Response,next:NextFunction)=>{

    try{
     const result = await ProjectServices.getProjectsFromDB(
         String(req.query?.search),
         String(req.query?.status),
         String(req.user?.id)
       );
   
       sendResponse(res, {
         success: true,
         statusCode: httpStatus.CREATED,
         message: "Projects fetched successfully!",
         data: result,
       });
    }
    catch(err){
     console.log("error from client: ",err);
     next(err)
    }
 
 }
 const updateProject = async (req:Request,res:Response,next:NextFunction) => {
    console.log("user controller:", req.body, "id", req.params);
    try {
        
        const result = await ProjectServices.updateProjectData(
            req.params.projectId,
            String(req.user?.id),
            req.body

        );
    
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Project data updated successfully",
            data: result,
        });
    }
        catch(err){
        console.log("error updating client: ",err);
        next(err)
        }
} 

const deleteProject= async (req:Request,res:Response,next:NextFunction) => {
    console.log("user controller:", req.body, "id", req.params);
    try {
        
        const result = await ProjectServices.deleteProjectFromDB(
            req.params.projectId,
            String(req.user?.id),
            );
    
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Project data deleted successfully",
            data: result,
        });
    }
        catch(err){
        console.log("error updating client: ",err);
        next(err)
        }
} 

 export const ProjectController={
    createClient,
    getClients,
    updateProject,
    deleteProject
 }