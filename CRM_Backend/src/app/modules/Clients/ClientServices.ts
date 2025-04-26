import httpStatus from "http-status";
import prisma from "../../../shared/prisma";

import ApiError from "../../Errors/ApiError";
import { IClientData } from "./ClientInterface";
import { Clients } from "@prisma/client";

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
        OR:search?[
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { company: { contains: search, mode: 'insensitive' } },
        ]: undefined
         
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  
    return clients; 
  };

//   update,first check email if same client email exists for this user then not
const updateClient = async (clientId: string, userId: string, data: Partial<Clients>) => {
   
    if (data.email) {
      const existing = await prisma.clients.findFirst({
        where: {
          userId,
          email: data.email,
          NOT: { client_id: clientId }, // Exclude current client
        },
      });
  
      if (existing) {
        throw new ApiError(httpStatus.CONFLICT, "Client with this email already exists!");
      }
    }
  
    const updatedClient = await prisma.clients.update({
      where: { 
        userId,
        client_id: clientId 
    },
      data,
    });
  
    return updatedClient;
  };
  

//   delete
const deleteClientFromDB = async (id: string,userId:string) => {
    const clientWithProjects = await prisma.clients.findFirst({
        where: {
          client_id: id,
          userId: userId,
        },
        include: {
          projects: true,
        },
      });
      
      if (!clientWithProjects) {
        throw new ApiError(httpStatus.NOT_FOUND, "Client not found or unauthorized.");
      }
      
      if (clientWithProjects.projects.length > 0) {
        throw new ApiError(httpStatus.CONFLICT, "This client has associated projects. Please delete them first.");
      }
      
    // const result = await prisma.clients.delete({
    //   where: {
    //     client_id:id,
    //   },
    // });
    const result = await prisma.$transaction([
        // prisma.interaction_logs.deleteMany({ where: { client_id: id } }),
        // prisma.reminders.deleteMany({ where: { client_id: id } }),
        prisma.clients.delete({ where: { userId,client_id: id } }),
      ]);
    
      console.log("Deleted client and related data", result);
      return result;
  
  };
export const ClientServices={
    createClientIntoDB,
    getClientsFromDB,
    updateClient,
    deleteClientFromDB
}