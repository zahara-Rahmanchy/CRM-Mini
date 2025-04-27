import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../Errors/ApiError";
import { CreateProjectBody } from "./ProjectInterface";
import { Projects, ProjectStatus } from "@prisma/client";
import { assert } from "console";

const createProjectInDB = async(userId:string,data:CreateProjectBody)=>{
    const { title,budget,deadline,status} = data

    const isUserExists = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
    
      if (!isUserExists) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exists!", "", "");
      }
      const isClientExists = await prisma.clients.findFirst({
        where:{
            userId,
            email:data.clientEmail
        }
      })
      if (!isClientExists) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "This client doesn't exists!",
          "",
          ""
        );
      }

      const result= await prisma.projects.create({
        data: {
          title,
          budget,
          deadline,
          status,
          client_id: isClientExists.client_id,
        },
      });
    return result
}

// const getProjectsFromDB = async (userId: string, search?: string,status?:string) => {
//   const orConditions: any[] = [];

  
//   if (search && search.trim() !== "" && search!==undefined) {
//     orConditions.push({ title: { contains: search, mode: 'insensitive' } });
//   }

//   if (status && status.trim() !== ""&& search!==undefined) {
//     orConditions.push({ status: status.toUpperCase() as ProjectStatus });
//   }
//     const projects = await prisma.projects.findMany({
//       where: {
//         client:{
//             userId
//         },
//         ...(orConditions.length > 0 && { OR: orConditions }),
         
//       },
//       select: {
//         project_id:true,
//         client_id : true,
//         title: true,
//         budget: true,
//         deadline: true,
//         status: true,
//         client: {
//           select: {
//             name: true,
//           },
//         },
//       },
//       orderBy: {
//         deadline: 'desc',
//       },
//     });
  
//     return projects; 
//   };
const getProjectsFromDB = async (userId: string, search?: string, status?: ProjectStatus) => {
  console.log("searhc: ",search,"\nstatus: ",status)
  const whereCondition: any = {
    client: {
      userId,
    },
  };

  if ((search !== undefined) && (search && search.trim() !== "")) {
    whereCondition.title = { contains: search, mode: 'insensitive' };
  }

  if ((status !== undefined) && (status && status.trim() !== "")) {
    whereCondition.status = status.toUpperCase() as ProjectStatus;
  }

  const projects = await prisma.projects.findMany({
    where: whereCondition,
    select: {
      project_id: true,
      client_id: true,
      title: true,
      budget: true,
      deadline: true,
      status: true,
      client: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      deadline: 'desc',
    },
  });

  return projects;
};

const updateProjectData = async(userId:string,projectId:string,data:Partial<Projects>)=>{

    const isUserExists = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
    
      if (!isUserExists) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exists!", "", "");
      }
      const isProjectExists = await prisma.projects.findFirst({
        where:{
            project_id:projectId,
            client:{
                userId:userId
            }
        }
      })
      if (!isProjectExists) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "This Project doesn't exists!",
          "",
          ""
        );
      }

}

const deleteProjectFromDB = async (id: string,userId:string) => {
    const isProject = await prisma.projects.findFirst({
        where: {
          project_id: id,
          client:{
            userId
         }
        },
        
      });
      
      if (!isProject) {
        throw new ApiError(httpStatus.NOT_FOUND, "Client not found or unauthorized.");
      }
      
      
      
    // const result = await prisma.clients.delete({
    //   where: {
    //     client_id:id,
    //   },
    // });
    const result = await prisma.$transaction([
        // prisma.interaction_logs.deleteMany({ where: { client_id: id } }),
        // prisma.reminders.deleteMany({ where: { client_id: id } }),
        prisma.projects.delete({  
        where: {
            project_id: id,
            client:{
              userId
           }
          },
        }),
      ]);
    
      console.log("Deleted project data", result);
      return result;
  
  };

export const ProjectServices={
    createProjectInDB,
    getProjectsFromDB,
    updateProjectData,
    deleteProjectFromDB
} 