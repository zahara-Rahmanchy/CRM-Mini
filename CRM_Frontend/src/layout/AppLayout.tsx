// import { useState } from 'react';
// import { Outlet, Link } from 'react-router-dom';
// import ThemeButton from '../components/ThemeButton';
// import Sidebar from "../components/Sidebar";

// const AppLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-[#ECF3FE]">
      
//       {/* Top Header */}
//       <header className="flex items-center justify-between p-2 z-20 relative bg-transparent text-[#157776]">
//         <div className="flex items-center gap-4">
//           <button onClick={toggleSidebar} className="text-2xl md:hidden">
//             ☰
//           </button>
//           <h1 className="md:text-xl text-sm font-semibold">Customer Relationship Management</h1>
//         </div>
//         <ThemeButton />
//       </header>

//       {/* Sidebar + Content + Right Panel */}
//       <div className="flex flex-1">
        
//         {/* Sidebar */}
//         <Sidebar sidebarOpen={sidebarOpen} />

//         {/* Main Content */}
//         <main className="flex-1 p-6 mt-4 md:mt-0">
//           <Outlet />
//         </main>

//         {/* Right-side Panel */}
//         <aside className="hidden md:block w-64 m-4 rounded-2xl bg-white p-4 shadow-md">
//           <h2 className="text-lg font-semibold text-[#157776] mb-4">Reminders</h2>
//           {/* Put your reminder items here */}
//           <ul className="space-y-2 text-sm text-gray-600">
//             <li>📌 Follow up with client</li>
//             <li>📌 Prepare report</li>
//             <li>📌 Team meeting at 4 PM</li>
//           </ul>
//         </aside>

//       </div>

//     </div>
//   );
// };

// export default AppLayout;
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ThemeButton from '../components/ThemeButton';
import Sidebar from "../components/Sidebar";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-[#ecf3fe] dark:bg-transparent">
      
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        
        {/* Top Header */}
        <header className="flex items-center justify-between p-2 z-20 bg-transparent text-[#157776]">
          <div className="flex items-center gap-4 me-auto md:mx-0 text-center">
            <button onClick={toggleSidebar} className="text-2xl md:hidden dark:text-gray-100">
              ☰
            </button>
            <h1 className="md:text-xl text-center text-sm font-semibold w-full ms-4 dark:text-gray-50 z-5">Welcome</h1>
          </div>
          <div className="block">
            <ThemeButton />
          </div>
        </header>

        {/* Main Content + Right Panel */}
        <div className="md:flex flex-1">
          {/* Main Content */}
          <main className="flex-1 p-6 mt-4 md:mt-0 ">
            
            <Outlet />
          </main>

          {/* Right-side Panel */}
          <aside className="overflow-y:scroll dark:bg-gray-800 dark:text-gray-100 md:block md:w-64 w-[90%] mx-auto md:m-4 rounded-2xl bg-white p-4 shadow-md">
            <h2 className="text-lg font-semibold text-[#157776] mb-4 dark:text-gray-100">Reminders</h2>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-200">
              <li>📌 Follow up with client</li>
              <li>📌 Prepare report</li>
              <li>📌 Team meeting at 4 PM</li>
            </ul>
          </aside>
        </div>

      </div>

    </div>
  );
};

export default AppLayout;
