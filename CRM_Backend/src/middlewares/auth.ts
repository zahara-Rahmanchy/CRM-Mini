import {NextFunction, Request, Response} from "express";

import httpStatus from "http-status";
import {Secret} from "jsonwebtoken";

import ApiError from "../app/Errors/ApiError";
import { jwtHelpers } from "../app/Utitlity/jwtHelpers";


/**
 * verifies the user based on the token
 * here role is added for future enhancement,but currently the role is only User
 */
const auth = (...requiredRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log("headers", req.headers);
        const token = req.headers.authorization;
  
        if (!token) {
          throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "Unauthorized Access",
            "",
            "You do not have permission to access this information"
          );
        }
  
        const verifiedUser = jwtHelpers.verifyToken(
          token,
          process.env.JWT_SECRET as Secret
        );
  
        const { exp } = verifiedUser;
        if (Math.floor(Date.now() / 1000) >= Number(exp)) {
          throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "Unauthorized Access",
            "",
            "Token has expired"
          );
        }
  
        req.user = verifiedUser;
  
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
          throw new ApiError(
            httpStatus.FORBIDDEN,
            "Forbidden",
            "",
            "This path is forbidden"
          );
        }
  
        next();
      } catch (error) {
        next(error);
      }
    };
  };
  
export default auth;
