import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import { IUser } from "./UserInterface"
import ApiError from "../../Errors/ApiError";
import * as bcrypt from "bcrypt";
import { userRoles } from "@prisma/client";
const registerUser = async(data:IUser)=>{
    const {name,email,password} = data;
    const isUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    if (isUser) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "User already exits",
          "",
          "A user is already registered with the email."
        );
      }
    // data and round of salts
    const hashed_passsword = await bcrypt.hash(password,12) 

    const result = await prisma.user.create({
       data: {
        name,
        email,
        password:hashed_passsword,
        role:userRoles.User
    },
       select:{
        name:true,
        email:true,
        password:false

       }
    })


}

export const UserServices={
    registerUser
}