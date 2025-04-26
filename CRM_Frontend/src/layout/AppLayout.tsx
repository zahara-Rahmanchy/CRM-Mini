import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import ThemeButton from '../components/ThemeButton';
import Sidebar from "../components/Sidebar"
// import { Menu } from 'lucide-react'; // optional, for a hamburger icon (install `lucide-react` or use any icon you want)

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header - Always Full Width */}
      <header className="flex items-center justify-between p-2 z-20 relative  bg-[#C9F4EB] text-[#157776] dark:bg-gray-800 border-b-2 border-b-teal-300  dark:border-b-gray-200 shadow">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="text-2xl md:hidden dark:text-white">
            ☰
          </button>
          <h1 className="md:text-xl text-sm font-semibold dark:text-white">Customer Relationship Management</h1>
        </div>
        <ThemeButton />
      </header>

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen}/>
        
        {/* Main Page Content */}
        <main className="flex-1 p-6 mt-4 md:mt-0">
          <Outlet />
        </main>
        </div>
    </div>
  );
};

export default AppLayout;
