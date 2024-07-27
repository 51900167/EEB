import React, { useState, useEffect } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDarkMode") === "true"
  );

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
    localStorage.setItem("isDarkMode", isDarkMode); // Lưu trạng thái vào localStorage
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      className="rounded-full p-2 bg-stone-100 dark:bg-stone-700 focus:outline-none"
      onClick={toggleDarkMode}>
      {isDarkMode ? (
        <MdOutlineDarkMode
          size={16}
          className="dark:text-white"
        />
      ) : (
        <MdOutlineLightMode
          size={16}
          className="dark:text-white"
        />
      )}
      <span className="sr-only">{isDarkMode ? "Light mode" : "Dark mode"}</span>
    </button>
  );
};

export default DarkModeToggle;
