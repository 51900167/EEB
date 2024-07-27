import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Student/Dashboard";
import MyCourses from "../pages/Student/MyCourses";
import ExamsAndAssignments from "../pages/Student/ExamsAndAssignments";
import LearningMaterials from "../pages/Student/LearningMaterials";
// import Profile from "../pages/Student/Profile";
import DiscussionAndSupport from "../pages/Student/DiscussionAndSupport ";
import Notifications from "../pages/Student/Notifications";

import Profile from "../components/Student/Profile/Profile";
import Message from '../components/Message/Message'

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/mycourses" element={<MyCourses />} />
      <Route path="/examsassignments" element={<ExamsAndAssignments />} />
      <Route path="/learningmaterials" element={<LearningMaterials />} />
      {/* <Route path="/profile" element={<Profile />} /> */}
      <Route path="/discussionandsupport" element={<DiscussionAndSupport />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/message" element={<Message />} />

      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default StudentRoutes;
