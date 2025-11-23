import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaUsers,
  FaFileAlt,
  FaMoneyBillWave,
  FaChartBar,
  FaBullhorn,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const menuItems = [
    { to: "/admin/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "/admin/teachers", icon: <FaChalkboardTeacher />, label: "Teachers" },
    { to: "/admin/students", icon: <FaUsers />, label: "Students" },
    { to: "/admin/exams", icon: <FaFileAlt />, label: "Exam Management" },
    { to: "/admin/payments", icon: <FaMoneyBillWave />, label: "Payments" },
    { to: "/admin/results", icon: <FaChartBar />, label: "Results" },
    { to: "/admin/analytics", icon: <FaChartBar />, label: "Analytics" },
    { to: "/admin/announcements", icon: <FaBullhorn />, label: "Announcements" },
    { to: "/admin/settings", icon: <FaCog />, label: "Settings" },
    { to: "/admin/profile", icon: <FaUserCircle />, label: "Profile" },
  ];

  return (
    <>
      {/* Hamburger (mobile only) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-blue-800 text-white p-2 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200 lg:hidden"
      >
        <FaBars size={22} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-blue-900 text-white flex flex-col shadow-2xl transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:w-64`}
      >
        {/* Header */}
        <div className="p-6 border-b border-blue-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/assets/rvu-logoo.png"
              alt="Admin Logo"
              className="w-12 h-12 rounded-full bg-white object-contain"
            />
            <h4 className="text-lg font-bold hidden lg:block">Admin</h4>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={closeSidebar}
            className="lg:hidden text-white hover:text-yellow-300 transition"
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-800 text-white shadow-md"
                        : "text-white hover:bg-blue-700 hover:text-white"
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;
