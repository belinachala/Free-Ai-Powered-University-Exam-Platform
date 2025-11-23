import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import all page components
import AdminDashboard from "@/pages/university/head/AdminDashboard";
import AdminTeachers from "@/pages/university/head/AdminTeachers";
import AdminStudents from "@/pages/university/head/AdminStudents";
import AdminAnalytics from "@/pages/university/head/AdminAnalytics";
import AdminAnnouncements from "@/pages/university/head/AdminAnnouncements";
import AdminExamManagement from "@/pages/university/head/AdminExamManagement";
import AdminPayments from "@/pages/university/head/AdminPayments";
import AdminProfile from "@/pages/university/head/AdminProfile";
import AdminSettings from "@/pages/university/head/AdminSettings";
import AdminResults from "@/pages/university/head/AdminResults";

const AdminRoutes: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen overflow-y-auto">
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="dashboard" replace />} />

        {/* Director main pages */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="teachers" element={<AdminTeachers />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="exams" element={<AdminExamManagement />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="results" element={<AdminResults />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="announcements" element={<AdminAnnouncements />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="profile" element={<AdminProfile />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
