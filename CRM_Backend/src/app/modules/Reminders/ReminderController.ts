import { NextFunction, Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReminderServices } from "./ReminderService";

const addReminder = async(req:Request,res:Response,next:NextFunction)=>{

    try{
     const result = await ReminderServices.addReminderIntoDB(
         req.body,
         String(req.user?.id)
       );
   
       sendResponse(res, {
         success: true,
         statusCode: httpStatus.CREATED,
         message: "Reminder created successfully!",
         data: result,
       });
    }
    catch(err){
     console.log("error from client: ",err);
     next(err)
    }
 
 }
 const getReminders = async(req:Request,res:Response,next:NextFunction)=>{
    console.log("req.eury: ",req.user)
    try{
     const result = await ReminderServices.getRemindersFromDB(
         String(req?.user?.id),
       
         
       );
        console.log("result con: ",result)
       sendResponse(res, {
         success: true,
         statusCode: httpStatus.CREATED,
         message: "Reminders fetched successfully!",
         data: result,
       });
    }
    catch(err){
     console.log("error from client: ",err);
     next(err)
    }
 
 }
 export const ReminderController={
    addReminder,
    getReminders
 }