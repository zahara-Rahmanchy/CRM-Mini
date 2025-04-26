import React from 'react'
import { Link } from 'react-router-dom';
const Sidebar = ({sidebarOpen}) => {
  return (
    <aside
        className={`
        absolute md:relative z-10 inset-y-0 left-0 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-transform duration-300 ease-in-out
        bg-[#C9F4EB] dark:bg-gray-800 dark:text-white text-[#157776] w-64 p-4
        md:relative md:translate-x-0
    `}
  >
    <nav className="flex flex-col gap-4 md:mt-4 mt-20">
      <Link to="/dashboard" >Dashboard</Link>
      <Link to="/settings">Settings</Link>
    </nav>
  </aside>
  )
}

export default Sidebar