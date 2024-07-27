import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ClassManagement() {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const teacherId = localStorage.getItem('username'); // Giả sử username là ID giáo viên

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}teacher/getclasses/${teacherId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch classes');
      const data = await response.json();
      console.log(data);

      setClasses(data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Class Management</h2>
      <div>
        <h3>Classes</h3>
        <ul>
          {classes.length > 0 ? (
            classes.map((classItem) => (
              <li key={classItem._id}>
                <span>___</span>
                <Link to={`/teacher/class/${classItem._id}`}>
                  <div>
                    <p>Class Name: {classItem.name}</p>
                    <p>Homeroom Teacher: {classItem.teacher.lastName + " " + classItem.teacher.firstName }</p>
                    <p>School Year: {classItem.semester.schoolYear ? classItem.semester.schoolYear.year : 'N/A'}</p>
                    <p>Semester: {classItem.semester.name}</p>
                    <p>Semester Status: {classItem.semester.isActive ? 'Active' : 'Inactive'}</p>
                    <p>Number of Students: {classItem.students.length}</p>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p>No classes found</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ClassManagement;