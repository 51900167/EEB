import React from "react";
import { Routes, Route } from "react-router-dom";
import ClassManagement from "../pages/Teacher/ClassManagement.jsx";
import Repository from "../pages/Teacher/Repository.jsx";
import Dashboard from "../pages/Teacher/Dashboard";
import ExamManagement from "../pages/Teacher/ExamManagement";
import DetailExam from '../components/Teacher/ExamManagement/ShowExam/HistoryExam/ExamDetail'
import Grading from "../pages/Teacher/Grading.jsx";
import ReportsAndStatistics from "../pages/Teacher/ReportsAndStatistics";
import ErrorPage from "../pages/Auth/ErrorPage.jsx";

import ClassDetails from "../components/Teacher/ClassManagement/ClassDetails.jsx";
import Profile from "../components/Teacher/Profile/Profile.jsx";

import Message from '../components/Message/Message'


// Phụng
// import CreateExam from "../pages/Teacher/ExamManagement/CreateExam/CreateExam"; ///
import CreateExam from '../../src/components/Teacher/ExamManagement/CreateExam/CreateExam.jsx'

import CreateExamAuto from "../../src/components/Teacher/ExamManagement/CreateExamAuto/CreateExamAuto";




const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClassManagement />} />
      <Route path="/repository" element={<Repository />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/class" element={<ClassManagement />} />
      <Route path="/class/:classId" element={<ClassDetails />} />
      <Route path="/grading" element={<Grading />} />
      <Route path="/exam" element={<ExamManagement />} />
      <Route path="/exam/:examId" element={<DetailExam />} />
      <Route path="/reports" element={<ReportsAndStatistics />} />
      <Route path="/" element={<ErrorPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/message" element={<Message />} />




      {/* Phung */}
      {/* create exam */}
      <Route path="/repository/createexam" element={<CreateExam />} />
      {/* create exam auto */}
      <Route path="/repository/createexamauto" element={<CreateExamAuto />} />
    </Routes>
  );
};

export default TeacherRoutes;
