import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Head/Dashboard";
import ExamManagement from "../pages/Head/ExamManagement";
import GradeManagement from "../pages/Head/GradeManagement.jsx";
// import TeacherManagement from "../pages/Head/TeacherManagement";
// import StudentManagement from "../pages/Head/StudentManagement";
import ReportsAndStatistics from "../pages/Head/ReportsAndStatistics";
import SystemSettings from "../pages/Head/SystemSettings";
import AccountManagement from "../pages/Head/AccountManagement";
import Message from '../components/Message/Message'
import SemesterManagement from '../pages/Head/SemesterManagement'
import ClassManagement from '../pages/Head/ClassManagement.jsx'

import Profile from "../components/Head/Profile/Profile.jsx";

import ErrorPage from "../pages/Auth/ErrorPage.jsx"


const HeadRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/exam" element={<ExamManagement />} />
      <Route path="/semester" element={<SemesterManagement />} />
      <Route path="/head/grade/:semesterId" element={<GradeManagement />} />
      <Route path="/grade/class/:classId" element={<ClassManagement />} />
      <Route path="/grade" element={<GradeManagement />} />
      {/* <Route path="/grade/class/:id" element={<ClassManagement />} /> */}
      {/* <Route path="/teacher" element={<TeacherManagement />} /> */}
      {/* <Route path="/student" element={<StudentManagement />} /> */}
      <Route path="/reports" element={<ReportsAndStatistics />} />
      <Route path="/settings" element={<SystemSettings />} />
      <Route path="/account" element={<AccountManagement />} />
      <Route path="/message" element={<Message />} />
      <Route path="*" element={<ErrorPage />} />

      <Route path="/profile" element={<Profile />} />
      
      {/* <Route path="/semester" element={<SemesterManagement />} /> */}



    </Routes>
  );
};

export default HeadRoutes;
