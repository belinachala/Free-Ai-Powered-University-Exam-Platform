import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from '../pages/university/student/Profile';
import Exams from '../pages/university/student/Exams';
import ResultsFeedback from '../pages/university/student/ResultsFeedback';
import LearningResources from '../pages/university/student/LearningResources';
import Notifications from '../pages/university/student/Notifications';
import StudentDashboard from '../pages/university/student/StudentDashboard';
const StudentRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<StudentDashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="exams" element={<Exams />} />
      <Route path="results" element={<ResultsFeedback />} />
      <Route path="resources" element={<LearningResources />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="/" element={<Exams />} />
    </Routes>
  );
};

export default StudentRoutes;