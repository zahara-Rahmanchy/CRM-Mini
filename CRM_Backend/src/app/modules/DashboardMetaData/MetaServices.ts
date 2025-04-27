import prisma from "../../../shared/prisma"

export const getMetaDataFromDB = async(userId:string)=>{
    const totalClients = await prisma.clients.count({
        where:{
            userId
        }
    })
    const totalProjects = await prisma.projects.count({
        where:{
            client:{
                userId
            }
        }
    })
    


  const projectsByStatus = (
    await prisma.projects.groupBy({
      by: ["status"],
      _count: {
        project_id: true,
      },
      where: {
        client: {
          userId: userId,  // Filter by userId
        },
      },
    })
  ).map(({ status, _count }) => ({ status, count: _count.project_id }));
  
  const projectCounts = await prisma.projects.groupBy({
    by: ['status'],
    _count: {
      status: true,
    },
    where: {
      client: {
        userId: userId, // Filter: projects whose client's userId matches
      },
    },
  });

  return {
    totalClients,
    totalProjects,
    projectsByStatus,
    projectCounts

  }
}