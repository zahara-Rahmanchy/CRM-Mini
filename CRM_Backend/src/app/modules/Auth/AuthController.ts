import { Request, Response, NextFunction } from "express";
import { AuthServices } from "./AuthServices";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("req: ", req);
    const result = await AuthServices.loginUser(req.body); 
    console.log({ result });

    // Sending a successful response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (err) {
    console.error("Error during login:", err);
    // Send the error to the next error-handling middleware
    next(err);
  }
};

export const AuthController = {
    loginUser,

}