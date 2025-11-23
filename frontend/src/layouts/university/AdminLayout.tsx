import React, { useState } from "react";
import AdminSidebar from "@/components/university/head/AdminSidebar";
import AdminHeader from "@/components/university/head/AdminHeader";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      <div className={`${isSidebarOpen ? "block" : "hidden"} lg:block`}>
        <AdminSidebar />
      </div>

      <div className="flex flex-col flex-1 w-full overflow-x-hidden">
        <AdminHeader onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto px-3 sm:px-6 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
