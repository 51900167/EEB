import React, { useEffect, useState } from 'react';

function ExamMagagement() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}head/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setData(data); // Cập nhật state với dữ liệu nhận được
        } else {
          console.log("Failed to fetch users:", response.statusText);
        }
      } catch (error) {
        console.log("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-white shadow rounded-lg dark:bg-stone-800">
      {data.length > 0 ? (
        <ul>
          {data.map((user, index) => (
            <li key={index}>
              {user.firstName} {user.lastName} - {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default  ExamMagagement
  