import React, { useState } from "react";
import Locations from "../../Locations/Locations";

const AddUser = ({ isOpen, onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    contactNumber: "",
    role: "Student", // Mặc định là Student, có thể thay đổi theo yêu cầu
  });

  const [error, setError] = useState(""); // Thêm state để lưu lỗi

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Data to be sent:", formData);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}head/adduser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("User added successfully:", data);
        onUserAdded(data); // Gọi hàm onUserAdded với dữ liệu người dùng mới
        onClose(); // Đóng modal sau khi thêm người dùng thành công
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error adding user");
        console.error("Error adding user:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Error adding user");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white w-96 p-6 rounded-lg shadow-lg">
        <div className="absolute top-0 right-0 p-2">
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="text-left">
          <h2 className="text-lg font-semibold mb-4">Thêm người dùng mới</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-xs text-gray-700"
              style={{ textAlign: "left" }}
            >
              Họ và tên đệm
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-xs text-gray-700"
              style={{ textAlign: "left" }}
            >
              Tên
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-xs text-gray-700"
              style={{ textAlign: "left" }}
            >
              Địa chỉ
            </label>
            <Locations
              onChange={(value) => setFormData({ ...formData, address: value })}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="contactNumber"
              className="block text-xs text-gray-700"
              style={{ textAlign: "left" }}
            >
              Số điện thoại
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-xs text-gray-700"
              style={{ textAlign: "left" }}
            >
              Vai trò
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mt-1"
            >
              <option value="Head">Head</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>
          </div>

          {error && (
            <div className="mb-4 text-red-600 text-xs">
              {error}
            </div>
          )}

          <div className="text-right">
            <button
              type="submit"
              className="px-3 py-1 text-xs text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;