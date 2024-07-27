// import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector để lấy ngôn ngữ từ Redux

// React icon
import {
  MdWorkspacesOutline,  
  // MdOutlineTextSnippet,
  // MdOutlinePerson,
  // MdOutlineSchool,
  // MdOutlineReport,
  // MdOutlineSettings,
  // MdOutlineAccountCircle,
} from "react-icons/md";

function HeadSideBar({ responsiveClass,toggleSidebar }) {
  const { pathname } = useLocation(); // Get current pathname for highlighting
  const language = useSelector((state) => state.language.language); // Lấy ngôn ngữ từ Redux


  const linkClass =
    "flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-stone-200 hover:text-gray-900 hover:dark:text-white hover:dark:bg-stone-700";
  const activeLinkClass = "bg-stone-200 dark:text-white dark:bg-stone-700";

  return (
    <div >
      <div
        className={`w-64 flex flex-col bg-stone-100 dark:bg-stone-900 text-black dark:text-white ${responsiveClass}`}>
        {/* <h2 className="text-xl font-bold p-4 border-b border-stone-700">
          Chào {username}!
        </h2> */}
        <ul className="flex flex-col space-y-2 p-4 text-sm mt-4 mx-4 rounded-lg shadow bg-white dark:bg-stone-800">
          
          <li>
            <NavLink
              to="/teacher"
              className={`${linkClass} ${
                pathname === "/teacher" && activeLinkClass
              }`}>
              <MdWorkspacesOutline size={16} className="mr-4" />
              {language === "vi" ? "Quản lý lớp học" : "Class Management"}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/teacher/class"
              className={`${linkClass} ${
                pathname.startsWith("/teacher/class") && activeLinkClass
              }`}>
              <MdWorkspacesOutline size={16} className="mr-4" />
              {language === "vi" ? "Quản lý lớp học" : "Class Management"}
            </NavLink>
          </li>
              {/* Create exam */}
          <li>
            <NavLink
              to="/teacher/repository"
              className={`${linkClass} ${
                pathname.startsWith("/teacher/repository") && activeLinkClass
              }`}>
              <MdWorkspacesOutline size={16} className="mr-4" />
              {language === "vi" ? "Kho lưu trữ đề" : "Repository"}
            </NavLink>
          </li>
              {/* Create Exam auto */}
          <li>
            <NavLink
              to="/teacher/dashboard"
              className={`${linkClass} ${
                pathname.startsWith("/teacher/dashboard") && activeLinkClass
              }`}>
              <MdWorkspacesOutline size={16} className="mr-4" />
              {language === "vi" ? "Bảng điều khiển" : "Dashboard"}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/teacher/dashboard"
              className={`${linkClass} ${
                pathname.startsWith("/teacher/dashboard") && activeLinkClass
              }`}>
              <MdWorkspacesOutline size={16} className="mr-4" />
              {language === "vi" ? "Bảng điều khiển" : "Dashboard"}
            </NavLink>
          </li>

          {/* <li>
            <NavLink
              to="/teacher/semester"
              className={`${linkClass} ${
                pathname.startsWith("/teacher/semester") && activeLinkClass
              }`}>
              <MdOutlineTextSnippet size={16} className="mr-4" />
              {language === "vi" ? "Quản lý niên khóa" : "Semester Management"}
            </NavLink>
          </li>      

          <li>
            <NavLink
              to="/teacher/grade"
              className={`${linkClass} ${
                pathname.startsWith("/teacher/grade") && activeLinkClass
              }`}>
              <MdOutlineTextSnippet size={16} className="mr-4" />
              {language === "vi" ? "Quản lý lớp học" : "Grade Management"}
            </NavLink>
          </li>  

          <li>
            <NavLink
              to="/teacher/exam"
              className={`${linkClass} ${
                pathname.startsWith("/teacher/exam") && activeLinkClass
              }`}>
              <MdOutlineTextSnippet size={16} className="mr-4" />
              {language === "vi" ? "Quản lý đề thi" : "Exam Management"}
            </NavLink>
          </li>
            

          <li>
            <NavLink
              to="/teacher/teacher"
              className={`${linkClass} ${
                pathname.startsWith("/teacher/teacher") && activeLinkClass
              }`}>
              <MdOutlinePerson size={16} className="mr-4" />
              {language === "vi" ? "Quản lý giáo viên" : "Teacher Management"}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teacher/student"
              className={`${linkClass} ${
                pathname.startsWith("/teacher/student") && activeLinkClass
              }`}>
              <MdOutlineSchool size={16} className="mr-4" />
              {language === "vi" ? "Quản lý tài khoản" : "Account Management"}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teacher/reports"
              className={`${linkClass} ${
                pathname.startsWith("/teacher/reports") && activeLinkClass
              }`}>
              <MdOutlineReport size={16} className="mr-4" />
              {language === "vi"
                ? "Báo cáo và thống kê"
                : "Reports and Statistics"}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teacher/settings"
              className={`${linkClass} ${
                pathname.startsWith("/teacher/settings") && activeLinkClass
              }`}>
              <MdOutlineSettings size={16} className="mr-4" />
              {language === "vi" ? "Cài đặt hệ thống" : "System Settings"}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teacher/account"
              className={`${linkClass} ${
                pathname.startsWith("/teacher/account")&& activeLinkClass
              }`}>
              <MdOutlineAccountCircle size={16} className="mr-4" />
              {language === "vi" ? "Quản lý tài khoản" : "Account Management"}
            </NavLink>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default HeadSideBar;
