import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './index.css';

// Landing pages
import Home from './pages/landingpage/Home';
import About from './pages/landingpage/About';
import Features from './pages/landingpage/Features';
import Exams from './pages/Exams';
import Gallery from './pages/landingpage/Gallery';
import Contact from './pages/landingpage/Contacts';
import Login from './pages/Login';
import Register from './pages/Register';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminDashboardLayout';
// University Components
import AdminSidebar from './components/university/head/AdminSidebar';
import AdminHeader from './components/university/head/AdminHeader';
import UniversityTeacherSidebar from './components/university/teacher/UniversityTeacherSidebar';
import TeacherHeader from './components/university/teacher/TeacherHeader';
import UniversityStudentSidebar from './components/university/student/UniversityStudentSidebar';
import UniversityStudentHeader from './components/university/student/UniversityStudentHeader';
 
// Routes
import AdminRoutes from './routes/AdminRoutes';
import UniversityTeacherRoutes from './routes/UniversityTeacherRoutes';
import UniversityStudentRoutes from './routes/UniversityStudentRoutes'; 
 
// profile completion
import UniversityDepartmentHeadProfileCompletion from './pages/ProfileCompletion/UniversityDepartmentHeadProfileCompletion';
import UniversityTeachersProfileCompletion from './pages/ProfileCompletion/UniversityTeachersProfileCompletion';
import UniversityStudentsProfileCompletion from './pages/ProfileCompletion/UniversityStudentsProfileCompletion';
 
const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Router>
      <Routes>
        {/* Public Landing Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/adminprofile" element={<UniversityDepartmentHeadProfileCompletion />} />
        <Route path="/uni-t-profile" element={<UniversityTeachersProfileCompletion />} />
        <Route path="/uni-s-profile" element={<UniversityStudentsProfileCompletion />} /> 

        {/* University Admin Layout */}
        <Route
          path="/admin/*"
          element={
            <AdminLayout Sidebar={AdminSidebar} Header={AdminHeader}>
              <AdminRoutes />
            </AdminLayout>
          }
        />

        {/* University Teacher Layout */}
        <Route
          path="/uni-teacher/*"
          element={
            <DashboardLayout Sidebar={UniversityTeacherSidebar} Header={TeacherHeader}>
              <UniversityTeacherRoutes />
            </DashboardLayout>
          }
        />

        {/* University Student Layout */}
        <Route
          path="/uni-student/*"
          element={
            <DashboardLayout Sidebar={UniversityStudentSidebar} Header={UniversityStudentHeader}>
              <UniversityStudentRoutes />
            </DashboardLayout>
          }
        />
 
 
      </Routes>
    </Router>
  );
};

export default App;
