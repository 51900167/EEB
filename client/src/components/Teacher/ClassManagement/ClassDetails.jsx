import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

function ClassDetails() {
  const { classId } = useParams();
  const [classDetails, setClassDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchClassDetails = useCallback(async (classId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}teacher/getclassdetails/${classId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch class details");
      const data = await response.json();

      if (data && data.semester && data.students && data.teacher) {
        const studentsWithInitializedScores = data.students.map((student) => ({
          ...student,
          oralScores: student.oralScores || [null, null, null],
          fifteenMinuteScores: student.fifteenMinuteScores || [null, null, null],
          fortyFiveMinuteScore: student.fortyFiveMinuteScore || null,
          finalScore: student.finalScore || null,
        }));
        setClassDetails({ ...data, students: studentsWithInitializedScores });
        setIsEditing(false);
        getScores(classId);
      } else {
        throw new Error("Class details not found");
      }
    } catch (error) {
      console.error("Error fetching class details:", error);
      setError(error.message);
    }
  }, []); // Danh sách phụ thuộc trống nếu fetchClassDetails không phụ thuộc vào bất kỳ giá trị nào khác

  useEffect(() => {
    if (classId) {
      fetchClassDetails(classId);
    }
  }, [classId, fetchClassDetails]);

  const getScores = async (classId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}teacher/getscores/${classId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch scores");
      const scoresData = await response.json();

      if (scoresData) {
        setClassDetails((prevDetails) => {
          const updatedStudents = prevDetails.students.map((student) => {
            const studentScores = scoresData.students.find(
              (score) => score.studentId === student._id
            );
            const updatedStudent = studentScores
              ? {
                  ...student,
                  oralScores: studentScores.scores.oral || [null, null, null],
                  fifteenMinuteScores: studentScores.scores.fifteenMinutes || [null, null, null],
                  fortyFiveMinuteScore: studentScores.scores.midTerm || null,
                  finalScore: studentScores.scores.finalExam || null,
                  averageScore: studentScores.scores.averageScore !== null ? parseFloat(studentScores.scores.averageScore.toFixed(2)) : null  // Điểm trung bình từ MongoDB
                }
              : student;

            return updatedStudent;
          });

          return { ...prevDetails, students: updatedStudents };
        });
      } else {
        throw new Error("Scores not found");
      }
    } catch (error) {
      console.error("Error fetching scores:", error);
      setError(error.message);
    }
  };

  const handleScoreChange = (studentId, scoreType, index, newScore) => {
    const parsedScore = newScore === "" ? null : parseFloat(newScore);
    if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 10) return;

    setClassDetails((prevDetails) => {
      const updatedStudents = prevDetails.students.map((student) => {
        if (student._id === studentId) {
          let updatedScores = [...student[scoreType]];
          if (index >= updatedScores.length) {
            updatedScores.push(parsedScore);
          } else {
            updatedScores[index] = parsedScore;
          }
          const updatedStudent = { ...student, [scoreType]: updatedScores, averageScore: null };
          
          return updatedStudent;
        }
        return student;
      });

      return { ...prevDetails, students: updatedStudents };
    });
  };

  const handleSingleScoreChange = (studentId, scoreType, newScore) => {
    const parsedScore = newScore === "" ? null : parseFloat(newScore);
    if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 10) return;

    setClassDetails((prevDetails) => {
      const updatedStudents = prevDetails.students.map((student) =>
        student._id === studentId
          ? {
              ...student,
              [scoreType]: parsedScore,
              averageScore: null // Set averageScore to null when a single score is changed
            }
          : student
      );

      return { ...prevDetails, students: updatedStudents };
    });
  };

  const saveScore = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}teacher/savescore/${classId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ students: classDetails.students }),
        }
      );
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save scores");
      }
    
      const result = await response.json();
      alert(result.message);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving scores:", error);
      setError(error.message);
      alert("Failed to save scores: " + error.message);
    }
  };

  const renderScoreInput = (student, scoreType, index) => {
    const value =
      student[scoreType][index] !== null
        ? student[scoreType][index].toString()
        : "";
    return (
      <input
        type="number"
        step="0.25"
        min="0"
        max="10"
        value={value}
        onChange={(e) =>
          handleScoreChange(student._id, scoreType, index, e.target.value)
        }
        style={{ width: "60px" }}
      />
    );
  };

  const renderSingleScoreInput = (student, scoreType) => {
    const value =
      student[scoreType] !== null ? student[scoreType].toString() : "";
    return (
      <input
        type="number"
        step="0.25"
        min="0"
        max="10"
        value={value}
        onChange={(e) =>
          handleSingleScoreChange(student._id, scoreType, e.target.value)
        }
        style={{ width: "60px" }}
      />
    );
  };

  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <h2>Class Details</h2>
      {classDetails ? (
        <div>
          <p>Class Name: {classDetails.name}</p>
          <p>
            Homeroom Teacher:{" "}
            {classDetails.teacher.lastName + " " + classDetails.teacher.firstName}
          </p>
          <p>School Year: {classDetails.semester.schoolYear.year}</p>
          <p>Semester: {classDetails.semester.name}</p>
          <p>
            Semester Status:{" "}
            {classDetails.semester.isActive ? "Active" : "Inactive"}
          </p>
          <p>Number of Students: {classDetails.students.length}</p>
          <table>
            <thead>
              <tr>
                <th rowSpan="2">Student Name</th>
                <th colSpan="3">Oral Scores (M)</th>
                <th colSpan="3">15-Minute Scores</th>
                <th rowSpan="2">Mid-term Score</th>
                <th rowSpan="2">Final Exam Score</th>
                <th rowSpan="2">Average Score</th>
              </tr>
              <tr>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
              </tr>
            </thead>
            <tbody>
              {classDetails.students.map((student) => (
                <tr key={student._id}>
                  <td>{student.lastName + " " + student.firstName}</td>
                  {[0, 1, 2].map((index) => (
                    <td key={`oral-${index}`}>
                      {isEditing ? (
                        renderScoreInput(student, "oralScores", index)
                      ) : (
                        student.oralScores[index] !== null
                          ? student.oralScores[index]
                          : "-"
                      )}
                    </td>
                  ))}
                  {[0, 1, 2].map((index) => (
                    <td key={`fifteen-${index}`}>
                      {isEditing ? (
                        renderScoreInput(student, "fifteenMinuteScores", index)
                      ) : (
                        student.fifteenMinuteScores[index] !== null
                          ? student.fifteenMinuteScores[index]
                          : "-"
                      )}
                    </td>
                  ))}
                                    <td>
                    {isEditing ? (
                      renderSingleScoreInput(student, "fortyFiveMinuteScore")
                    ) : (
                      student.fortyFiveMinuteScore !== null
                        ? student.fortyFiveMinuteScore
                        : "-"
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      renderSingleScoreInput(student, "finalScore")
                    ) : (
                      student.finalScore !== null
                        ? student.finalScore
                        : "-"
                    )}
                  </td>
                  <td>
                    {student.averageScore !== null
                      ? student.averageScore
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isEditing ? (
            <button onClick={saveScore}>Save Scores</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit Scores</button>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ClassDetails;