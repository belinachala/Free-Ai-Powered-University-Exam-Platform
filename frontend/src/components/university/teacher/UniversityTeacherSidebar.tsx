import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaBook,
  FaChartLine,
  FaFileAlt,
  FaUsers,
  FaCog,
  FaQuestionCircle,
  FaChartPie,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  isMobile: boolean;
}



const UniversityTeacherSidebar: React.FC<SidebarProps> = ({ open, setOpen, isMobile }) => {
  const menuItems = [
    { path: "/uni-teacher/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { path: "/uni-teacher/create-exam", icon: <FaPlusCircle />, label: "Create Exam" },
    { path: "/uni-teacher/my-exams", icon: <FaBook />, label: "My Exams" },
    { path: "/uni-teacher/results", icon: <FaChartLine />, label: "Student Results" },
    { path: "/uni-teacher/analysis", icon: <FaChartPie />, label: "Analysis" },
    { path: "/uni-teacher/reports", icon: <FaFileAlt />, label: "Reports" },
    { path: "/uni-teacher/students", icon: <FaUsers />, label: "Student Management" },
    { path: "/uni-teacher/settings", icon: <FaCog />, label: "Settings" },
    { path: "/uni-teacher/help", icon: <FaQuestionCircle />, label: "Help" },
  ];

  return (
    <>
      {/* Overlay for mobile when open */}
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-blue-900 text-white shadow-lg z-40 transition-all duration-300
          ${open ? "w-64" : "w-16"}`}
        role="navigation"
        aria-label="Teacher sidebar"
      >
        {/* Header Section */}
        <div className="flex items-center justify-between p-2 border-b border-blue-700">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle sidebar"
              className="p-2 rounded-md hover:bg-blue-800 focus:outline-none"
            >
              {isMobile && open ? (
                <FaTimes className="text-white" />
              ) : (
                <FaBars className="text-white" />
              )}
            </button>
            {open ? (
              <div className="flex flex-col ml-1">
                <img src="/assets/rvu-logoo.png" alt="RVU logo" className="w-24" /> 
              </div>
            ) : (
              <img src="/assets/rvu-logoo.png" alt="RVU logo" className="w-8 rounded" />
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-800 text-white font-semibold"
                        : "text-gray-200 hover:bg-blue-700 hover:text-white"
                    }`
                  }
                >
                  <span className="w-6 text-center">{item.icon}</span>
                  {open && <span className="ml-3">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-blue-700 p-3">
          <button
            className="flex items-center w-full p-2 text-gray-200 hover:bg-blue-800 rounded-lg transition-colors duration-200"
            onClick={() => alert("Logout clicked")}
          >
            <FaSignOutAlt className="mr-3" />
            {open && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default UniversityTeacherSidebar;
