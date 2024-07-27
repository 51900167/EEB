import React from "react";
import { NavLink, useLocation } from "react-router-dom";

// React icon
import {
  MdOutlineTextSnippet,
  MdOutlinePerson,
  MdOutlineSchool,
  MdOutlineReport,
  MdOutlineSettings,
  MdOutlineAccountCircle,
} from "react-icons/md";

function HeadSideBar() {
  const { pathname } = useLocation(); // Get current pathname for highlighting

  const linkClass =
    "flex items-center  py-2.5 px-4 rounded transition duration-200 hover:bg-slate-200 hover:text-back";
  const activeLinkClass = "bg-slate-200 text-black"; // Highlight style
  const responsiveClass = "hidden md:flex"; // Ẩn trên màn hình nhỏ, hiển thị trên màn hình lớn (>= md)
  const smallClass = "text-black hover:text-gray-300";

  return (
    <div>
      <div
        className={`min-h-screen w-64 bg-fff-800 text-black flex flex-col ${responsiveClass}`}
      >
        <h2 className="text-xl font-bold p-4 border-b border-gray-700">
          Student Dashboard
        </h2>
        <ul className="flex flex-col space-y-2 p-4">
          <li>
            <NavLink
              to="/head"
              className={`${linkClass} ${
                pathname === "/head" && activeLinkClass
              }`} // Apply active style based on pathname
            >
              <MdOutlineTextSnippet size={20} className="mr-4" />
              <span>Bảng điều khiển</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/head/exam"
              className={`${linkClass} ${
                pathname === "/head/exam" && activeLinkClass
              }`} // Apply active style based on pathname
            >
              <MdOutlineTextSnippet size={20} className="mr-4" />
              <span >Quản lý đề thi</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/head/teacher"
              className={`${linkClass} ${
                pathname === "/head/teacher" && activeLinkClass
              }`} // Apply active style based on pathname
            >
              <MdOutlinePerson size={20} className="mr-4" />
              <span>Quản lý giáo viên</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/head/student"
              className={`${linkClass} ${
                pathname === "/head/student" && activeLinkClass
              }`} // Apply active style based on pathname
            >
              <MdOutlineSchool size={20} className="mr-4" />
              <span>Quản lý sinh viên</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/head/reports"
              className={`${linkClass} ${
                pathname === "/head/reports" && activeLinkClass
              }`} // Apply active style based on pathname
            >
              <MdOutlineReport size={20} className="mr-4" />
              <span>Báo cáo và thống kê</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/head/settings"
              className={`${linkClass} ${
                pathname === "/head/settings" && activeLinkClass
              }`} // Apply active style based on pathname
            >
              <MdOutlineSettings size={20} className="mr-4" />
              <span>Cài đặt hệ thống</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/head/account"
              className={`${linkClass} ${
                pathname === "/head/account" && activeLinkClass
              }`} // Apply active style based on pathname
            >
              <MdOutlineAccountCircle size={20} className="mr-4" />
              <span>Quản lý tài khoản</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="md:hidden flex flex-col items-center space-y-4 fixed top-1/2 left-0 transform -translate-y-1/2 bg-fff-800 p-2 rounded-r-lg">
      <div  >
        <NavLink to="/head" className={smallClass}>
          <MdOutlineTextSnippet size={30} />
        </NavLink>
        <NavLink to="/head/exam" className={smallClass}>
          <MdOutlineTextSnippet size={30} />
        </NavLink>
        <NavLink to="/head/teacher" className={smallClass}>
          <MdOutlineSchool size={30} />
        </NavLink>
        <NavLink to="/head/student" className={smallClass}>
          <MdOutlinePerson size={30} />
        </NavLink>
        <NavLink to="/head/reports" className={smallClass}>
          <MdOutlineReport size={30} />
        </NavLink>
        <NavLink to="/head/settings" className={smallClass}>
          <MdOutlineSettings size={30} />
        </NavLink>
        <NavLink to="/head/account" className={smallClass}>
          <MdOutlineAccountCircle size={30} />
        </NavLink>
      </div>
      </div>
    </div>
  );
}

export default HeadSideBar;
