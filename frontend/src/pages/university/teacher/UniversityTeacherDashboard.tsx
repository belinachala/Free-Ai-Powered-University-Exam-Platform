import React from "react";
import { Link } from "react-router-dom";
import {
  FaPlusCircle,
  FaBook,
  FaUsers,
  FaClock,
  FaUserGraduate,
} from "react-icons/fa";

const UniversityTeacherDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mb-2">
          Welcome, Teacher!
        </h1>
        <p className="text-gray-600">
          Here’s your AI-powered exam overview and quick actions.
        </p>
      </div>

      {/* Widgets Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Exams */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg rounded-xl p-5 text-white flex items-center justify-between transform hover:scale-105 transition-transform">
          <div>
            <p className="text-sm opacity-80">Total Exams</p>
            <p className="text-2xl font-bold">12</p>
          </div>
          <FaBook className="text-4xl opacity-90" />
        </div>

        {/* Total Students */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 shadow-lg rounded-xl p-5 text-white flex items-center justify-between transform hover:scale-105 transition-transform">
          <div>
            <p className="text-sm opacity-80">Total Students</p>
            <p className="text-2xl font-bold">320</p>
          </div>
          <FaUsers className="text-4xl opacity-90" />
        </div>

        {/* Pending Grading */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg rounded-xl p-5 text-white flex items-center justify-between transform hover:scale-105 transition-transform">
          <div>
            <p className="text-sm opacity-80">Pending Grading</p>
            <p className="text-2xl font-bold">18</p>
          </div>
          <FaClock className="text-4xl opacity-90" />
        </div>

        {/* Recent Students */}
        <div className="bg-gradient-to-r from-pink-400 to-pink-600 shadow-lg rounded-xl p-5 text-white flex items-center justify-between transform hover:scale-105 transition-transform">
          <div>
            <p className="text-sm opacity-80">Recent Students</p>
            <p className="text-2xl font-bold">8</p>
          </div>
          <FaUserGraduate className="text-4xl opacity-90" />
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/uni-teacher/create-exam"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-xl shadow-lg hover:scale-105 transition transform font-medium"
          >
            <FaPlusCircle /> Create New Exam
          </Link>
          <Link
            to="/uni-teacher/my-exams"
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-5 py-3 rounded-xl shadow-lg hover:scale-105 transition transform font-medium"
          >
            <FaBook /> View All Exams
          </Link>
        </div>
      </div>

      {/* Upcoming Exams */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Upcoming Exams</h2>
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 shadow-lg rounded-xl p-4">
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between hover:bg-blue-100 rounded-lg px-2 transition">
              <span className="font-medium text-gray-700">Math 101 - Midterm Exam</span>
              <span className="text-gray-500 text-sm">Tomorrow, 10:00 AM</span>
            </li>
            <li className="py-3 flex justify-between hover:bg-blue-100 rounded-lg px-2 transition">
              <span className="font-medium text-gray-700">Computer Science - Quiz 2</span>
              <span className="text-gray-500 text-sm">Friday, 2:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Recent Activities</h2>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg rounded-xl p-4">
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between hover:bg-pink-100 rounded-lg px-2 transition">
              <span>Created new MCQ Exam: “Java Basics”</span>
              <span className="text-gray-500 text-sm">2 hours ago</span>
            </li>
            <li className="py-3 flex justify-between hover:bg-pink-100 rounded-lg px-2 transition">
              <span>Graded “Python Fundamentals” Exam for 30 students</span>
              <span className="text-gray-500 text-sm">1 day ago</span>
            </li>
            <li className="py-3 flex justify-between hover:bg-pink-100 rounded-lg px-2 transition">
              <span>Added 10 new questions to Question Bank</span>
              <span className="text-gray-500 text-sm">2 days ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UniversityTeacherDashboard;
