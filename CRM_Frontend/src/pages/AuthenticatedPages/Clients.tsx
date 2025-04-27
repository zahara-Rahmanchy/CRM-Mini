

import { useState } from "react";
import AddClient from "../../components/clients/AddClient";
import ClientTable from "../../components/clients/ClientTable";

const Clients = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      {/* Top Section: Button + Search */}
      <div className="w-full mb-10 flex md:flex-row flex-col gap-2 md:items-center  justify-between">
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="bg-transparent text-sm border md:order-1 order-2 border-teal-300 dark:border-gray-500 dark:text-gray-100 hover:bg-teal-700 cursor-pointer hover:text-white text-teal-700 font-semibold py-2 px-4 rounded-lg md:mb-0"
        >
          {isOpen ? "Close Form" : "+ Add New Client"}
        </button>

        {/* <div>
          <input
            className="border border-teal-300 dark:border-gray-500 px-2 py-1 rounded-lg w-full"
            placeholder="Search"
          />
        </div> */}
      </div>

      {/* Dropdown Form Below */}
      {isOpen && (
        <div className={`w-full mb-10`}>
          <AddClient setIsOpen={setIsOpen} />
        </div>
      )}

      {/* Client Table */}
      <ClientTable />
    </section>
  );
};

export default Clients;

