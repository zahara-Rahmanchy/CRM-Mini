import { useQuery } from '@tanstack/react-query';

import { fetchDashboardStatistics } from '../../api/metaDataApi';

const Dashboard = () => {
  const { 
    data: dashboardStats, 
    isLoading: projectLoading, 
    error: projectError 
  } = useQuery({
    queryKey: ['dashboardStatistics'], 
    queryFn: fetchDashboardStatistics
  });

  console.log("dash: ",dashboardStats)
  // if (projectLoading) {
  //   return  <div className="flex justify-center items-center">
  //             <div className="w-9 h-9 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-ping"></div>
  //          </div> 

  // }

  if (projectError instanceof Error) {
    console.log(projectError)
    return <div>Error: {projectError.message}</div>;
  }
  return (
    <section className='grid md:grid-cols-4 grid-cols-1 gap-4 w-full  place-items-center'> 
    
        <div className="md:col-span-2 text-center dark:bg-gray-800 dark:text-gray-100 md:block md:w-64 w-[90%] mx-auto md:m-4 rounded-2xl bg-white p-4 shadow-md">
          <p>Total Clients: </p>
          <p className='text-lg'>{dashboardStats?.data?.totalClients}</p>
        </div>

        <div className="md:col-span-2 dark:bg-gray-800 dark:text-gray-100 md:block md:w-64 w-[90%] mx-auto md:m-4 rounded-2xl bg-white p-4 shadow-md">
        <p>Total Projects </p>
        <p className='text-lg'>{dashboardStats?.data?.totalProjects}</p>
        </div>
        
        <div className='md:col-span-4 mx-5 grid md:grid-cols-4 grid-cols-1 place-items-center'>
        {(dashboardStats?.data?.projectCounts?.length===0 || dashboardStats?.data?.projectCounts===undefined)&&
        <p className='text-teal-800 text-center w-full mx-auto col-span-4'>No Projects Yet!</p>}

          {dashboardStats?.data?.projectsByStatus?.map((project:{status:string,count:number}, index:number) => (
            <div key={index}  className=" text-center dark:bg-gray-800 dark:text-gray-100 md:block md:w-64 w-[90%] mx-auto md:m-4 rounded-2xl bg-white p-4 shadow-md">
               <p>
                {project.status}</p>
                
                <p className='text-lg'>{project.count}</p>
             
            </div>
          ))}
        </div>
         
          
      
    
    
    </section>
  )
}

export default Dashboard