import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaBook,
  FaChartLine,
  FaFileAlt,
  FaBell,
} from "react-icons/fa";

const UniversityStudentSidebar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-blue-800 text-white flex flex-col shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-blue-600">
        <img
          src="/assets/rvu-logoo.png"
          alt="Logo"
          className="w-32 mx-auto rounded-full bg-white p-1"
        />
        <h2 className="text-xl font-bold text-center mt-3 text-white"> 
        </h2>
      </div>

      {/* Menu Section */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2 text-white">
          <li>
            <NavLink
              to="/uni-student/dashboard"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? "bg-blue-700" : ""
                }`
              }
            >
              <FaUser className="mr-2 text-white" />
              <span className="text-white font-medium">Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/uni-student/profile"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? "bg-blue-700" : ""
                }`
              }
            >
              <FaUser className="mr-2 text-white" />
              <span className="text-white font-medium">Profile</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/uni-student/exams"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? "bg-blue-700" : ""
                }`
              }
            >
              <FaBook className="mr-2 text-white" />
              <span className="text-white font-medium">Exams</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/uni-student/results"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? "bg-blue-700" : ""
                }`
              }
            >
              <FaChartLine className="mr-2 text-white" />
              <span className="text-white font-medium">
                Results & Feedback
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/uni-student/resources"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? "bg-blue-700" : ""
                }`
              }
            >
              <FaFileAlt className="mr-2 text-white" />
              <span className="text-white font-medium">
                Learning Resources
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/uni-student/notifications"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? "bg-blue-700" : ""
                }`
              }
            >
              <FaBell className="mr-2 text-white" />
              <span className="text-white font-medium">Notifications</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UniversityStudentSidebar;
