import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import UniversityTeacherDashboard from "../pages/university/teacher/UniversityTeacherDashboard";
import UniversityTeacherCreateExam from "../pages/university/teacher/UniversityTeacherCreateExam";
import UniversityTeacherMyExams from "../pages/university/teacher/UniversityTeacherMyExams";
import UniversityTeacherStudentResults from "../pages/university/teacher/UniversityStudentResults";
import UniversityTeacherAnalysis from "../pages/university/teacher/UniversityTeacherAnalysis";
import UniversityTeacherReports from "../pages/university/teacher/UniversityTeacherReports";
import UniversityTeacherSettings from "../pages/university/teacher/UniversityTeacherSettings";
import UniversityTeacherStudentManagement from "../pages/university/teacher/UniversityTeacherStudentManagement";
import UniversityTeacherHelpCenter from "../pages/university/teacher/UniversityTeacherHelpCenter";

/**
 * UniversityTeacherRoutes
 *
 * This is mounted by App inside the main content area. The Sidebar uses links under
 * /uni-teacher/* so these routes are defined relative to that base.
 */
const UniversityTeacherRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Redirect base /uni-teacher to /uni-teacher/dashboard */}
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<UniversityTeacherDashboard />} />
      <Route path="create-exam" element={<UniversityTeacherCreateExam />} />
      <Route path="my-exams" element={<UniversityTeacherMyExams />} />
      <Route path="results" element={<UniversityTeacherStudentResults />} />
      <Route path="analysis" element={<UniversityTeacherAnalysis />} />
      <Route path="reports" element={<UniversityTeacherReports />} />
      <Route path="settings" element={<UniversityTeacherSettings />} />
      <Route path="students" element={<UniversityTeacherStudentManagement />} />
      <Route path="help" element={<UniversityTeacherHelpCenter />} />
      {/* Fallback to dashboard */}
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default UniversityTeacherRoutes;