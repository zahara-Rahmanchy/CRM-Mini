import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import jwt, {JwtPayload, Secret} from "jsonwebtoken";

/* while logging first comparing the passwords and then using jwt to generate token
to ensure that only logged users can access informations*/
const loginUser = async (payload: {email: string; password: string}) => {
    const userData = await prisma.user.findUniqueOrThrow({
      where: {
        email: payload.email,
      },
    });
   
    const isCorrectPassword: boolean = await bcrypt.compare(
      payload.password,
      userData.password
    );
    if (!isCorrectPassword) {
      throw new Error("Password incorrect!");
    }
//   role kept for later use
    const accessToken = jwt.sign(
      {
        id: userData.id,
        email: userData.email,
        role: userData.role,
      },
      process.env.JWT_SECRET as Secret,
      {
        algorithm: "HS256",
        expiresIn: process.env.EXPIRES_In as string,
      }
    );
    console.log({accessToken}, {userData});
    const responseData = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      token: accessToken,
    };
    return responseData;
  };

  export const AuthServices = {
    loginUser,
}