import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ClassList from "../../components/Head/ClassManagement/ClassList";



const AddedStudentsTable = ({ students = [], onRemoveStudent }) => (
  <div>
    <h3>Students Added to Class</h3>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student._id}>
            <td>{student.username}</td>
            <td>{student.lastName}</td>
            <td>{student.firstName}</td>
            <td>
              <button onClick={() => onRemoveStudent(student._id)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CurrentTeacherInfo = ({ teacher }) => (
  <div>
    <h3>Current Teacher</h3>
    {teacher ? (
      <p>{teacher.firstName} {teacher.lastName}</p>
    ) : (
      <p>No teacher assigned</p>
    )}
  </div>
);

const StudentsWithoutClassTable = ({ students = [], onAddStudent }) => (
  <div>
    <h3>Students Without Class</h3>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.length > 0 ? (
          students.map((student) => (
            <tr key={student._id}>
              <td>{student.username}</td>
              <td>{student.lastName}</td>
              <td>{student.firstName}</td>
              <td>
                <button onClick={() => onAddStudent(student._id)}>Add</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">No students found</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

const TeachersWithoutClassTable = ({ teachers = [], onAddTeacher, onChangeTeacher, hasTeacher }) => (
  <div>
    <h3>Teachers Without Class</h3>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {teachers.length > 0 ? (
          teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.username}</td>
              <td>{teacher.lastName}</td>
              <td>{teacher.firstName}</td>
              <td>
                <button onClick={() => hasTeacher ? onChangeTeacher(teacher._id) : onAddTeacher(teacher._id)}>
                  {hasTeacher ? 'Change' : 'Add'}
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">No teachers found</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
const ClassManagement = () => {
  const { classId } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [classInfo, setClassInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [allTeachers, setAllTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [teacherSearchQuery, setTeacherSearchQuery] = useState("");

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}head/class/${classId}`);
        if (response.ok) {
          const data = await response.json();
          setClassInfo(data);
          setTeacher(data.teacher);
          setStudents(data.students);
        } else {
          console.error("Error fetching class details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching class details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      fetchClassDetails();
    }
  }, [classId]);

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}head/class/studentswithoutclass/${classId}`);
        if (response.ok) {
          const data = await response.json();
          setAllStudents(data);
          setFilteredStudents(data);
        } else {
          console.error("Error fetching students without class:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching students without class:", error);
      }
    };

    if (classId) {
      fetchAllStudents();
    }
  }, [classId]);

  useEffect(() => {
    const fetchTeachersWithoutClass = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}head/class/teacherswithoutclass/${classId}`);
        if (response.ok) {
          const data = await response.json();
          setAllTeachers(data);
          setFilteredTeachers(data);
        } else {
          console.error("Error fetching teachers without class:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching teachers without class:", error);
      }
    };

    fetchTeachersWithoutClass();
  }, [classId]);

  const addTeacher = async (teacherId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}head/class/${classId}/addteacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teacherId }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setTeacher(data.teacher);
        
        // Cập nhật lại danh sách giáo viên chưa có lớp
        const updatedTeachersResponse = await fetch(`${process.env.REACT_APP_API_URL}head/class/teacherswithoutclass/${classId}`);
        if (updatedTeachersResponse.ok) {
          const updatedTeachers = await updatedTeachersResponse.json();
          setAllTeachers(updatedTeachers);
          setFilteredTeachers(updatedTeachers);
        } else {
          console.error("Error fetching updated teachers without class:", updatedTeachersResponse.statusText);
        }
      } else {
        console.error("Class already has a teacher or error adding teacher");
      }
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  const addStudent = async (studentId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}head/class/${classId}/addstudent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId }),
      });

      if (response.ok) {
        const data = await response.json();
        setStudents(data.students);
        setAllStudents(allStudents.filter((student) => student._id !== studentId));
        setFilteredStudents(filteredStudents.filter((student) => student._id !== studentId));
      } else {
        console.error("Error adding student");
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const removeStudent = async (studentId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}head/class/${classId}/removestudent`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId }),
      });

      if (response.ok) {
        const removedStudent = students.find((student) => student._id === studentId);
        setStudents(students.filter((student) => student._id !== studentId));
        if (removedStudent) {
          setAllStudents([...allStudents, removedStudent]);
          setFilteredStudents([...filteredStudents, removedStudent]);
        }
      } else {
        console.error("Error removing student:", response.statusText);
      }
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  const handleSearchStudents = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value) {
      const lowercasedQuery = event.target.value.toLowerCase();
      setFilteredStudents(
        allStudents.filter((student) =>
          student.firstName.toLowerCase().includes(lowercasedQuery) ||
          student.lastName.toLowerCase().includes(lowercasedQuery) ||
          student.username.toLowerCase().includes(lowercasedQuery)
        )
      );
    } else {
      setFilteredStudents(allStudents);
    }
  };

  const handleSearchTeachers = (event) => {
    setTeacherSearchQuery(event.target.value);
    if (event.target.value) {
      const lowercasedQuery = event.target.value.toLowerCase();
      setFilteredTeachers(
        allTeachers.filter((teacher) =>
          teacher.firstName.toLowerCase().includes(lowercasedQuery) ||
          teacher.lastName.toLowerCase().includes(lowercasedQuery) ||
          teacher.username.toLowerCase().includes(lowercasedQuery)
        )
      );
    } else {
      setFilteredTeachers(allTeachers);
    }
  };

  return (
    <div>
      <h2>Class Management</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CurrentTeacherInfo teacher={teacher} />
          <div>
            <h3>Manage Students</h3>
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={handleSearchStudents}
            />
            <StudentsWithoutClassTable
              students={filteredStudents}
              onAddStudent={addStudent}
            />
            <AddedStudentsTable
              students={students}
              onRemoveStudent={removeStudent}
            />
          </div>
          <div>
            <h3>Manage Teachers</h3>
            <input
              type="text"
              placeholder="Search teachers..."
              value={teacherSearchQuery}
              onChange={handleSearchTeachers}
            />
            <TeachersWithoutClassTable
              teachers={filteredTeachers}
              onAddTeacher={addTeacher}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ClassManagement;