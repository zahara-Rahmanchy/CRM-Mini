import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ sidebarOpen }) => {
  return (
    <aside
      className={`
        absolute md:relative z-10 inset-y-0 left-0 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-transform duration-300 ease-in-out
        rounded-2xl bg-white shadow-md
        dark:bg-gray-800
        border-r border-gray-300 text-teal-800 dark:text-gray-100
        w-64 p-4
        md:relative md:translate-x-0
      `}
    >
    <h1 className="md:text-lg text-sm md:mt-auto mt-8 font-semibold border-b-2 border-gray-200 dark:border-gray-700 py-5">Customer Relationship Management</h1>
      
      <nav className="flex flex-col gap-4 mt-4 ">
        <Link to="/Dashboard">Dashboard</Link>
        <Link to="/Projects">Projects</Link>
        <Link to="/Client">Clients</Link>
        <Link to="/InteractionLogs">Interaction Logs</Link>
        <button
        type=""
        className="bg-teal-800 hover:bg-teal-700 dark:bg-gray-700 dark:hover:bg-gray-900 text-white font-semibold py-2 rounded-lg mt-2 transition"
      >
       Logout
      </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
