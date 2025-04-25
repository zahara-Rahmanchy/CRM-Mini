import httpStatus from "http-status";
import prisma from "../../../shared/prisma";

import ApiError from "../../Errors/ApiError";
import { IClientData } from "./ClientInterface";

const createClientIntoDB = async (data: IClientData, id: string) => {
    console.log("data: ", data, "\n", "id:", id);
    const isUserExists = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  
    if (!isUserExists) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exists!", "", "");
    }
    const isClientExists = await prisma.clients.findFirst({
      where: {
        userId: id,
        email: data.email,
      },
    });
    console.log("isClientExists: ", isClientExists);
    if (isClientExists!== null) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "This client already exists!",
        "",
        ""
      );
    }
    const result = await prisma.clients.create({
      data: {
        ...data,
        userId: id,
      },
    });
    console.log({result});
    return result;
  };

//   get and also search based on name,email or company
const getClientsFromDB = async (userId: string, search?: string) => {
    const clients = await prisma.clients.findMany({
      where: {
        userId,
        OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
              { company: { contains: search, mode: 'insensitive' } },
            ]
         
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  
    return clients; 
  };
export const ClientServices={
    createClientIntoDB,
    getClientsFromDB
}