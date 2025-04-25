import { UserServices } from "./UserServices";
import { Request, Response, NextFunction } from "express";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("user controller:", req);
  
      // Assuming userServices.createUserService returns a result or throws an error
      const result = await UserServices.registerUser(req.body)
  
      // Sending the success response if everything went well
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: result,
      });
    } catch (err) {
      console.log("Error in user controller:", err);
       next(err)
    }
  };
  

  export const UserControllers={
    createUser
  }