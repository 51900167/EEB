import React, { useState } from "react";
import TitleExam from "./TitleExam/TitleExam";
import ChapterList from "./Chapter/ChapterList";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const QuestionsExam = () => {
  const [showForm, setShowForm] = useState(false);

  const [examForm, setExamForm] = useState({
    examID: 1,
    idForTeacher: "",
    titleExam: "",
    classExam: "",
    time: "",
    score: "",
    description: "",
    chapters: [],
  });

  const handleChangeExamForm = (e) => {
    setExamForm({
      ...examForm,
      [e.target.name]: e.target.value,
    });
  };

  const addChapterToChapters = () => {
    setExamForm({
      ...examForm,
      chapters: [
        ...examForm.chapters,
        {
          chapterID: examForm.chapters.length + 1,
          titleChapter: "",
          questions: [],
        },
      ],
    });
  };

  const addQuestionToQuestions = (indexChapter, contentQuestion) => {
    const updatedQuestionToChapter = [...examForm.chapters];
    updatedQuestionToChapter[indexChapter] = {
      ...updatedQuestionToChapter[indexChapter],
      questions: contentQuestion,
    };
    setExamForm({
      ...examForm,
      chapters: updatedQuestionToChapter,
    });
  };

  const addDataUploadToChapters = (dataFromUpload) => {
    const newChapters = dataFromUpload.chapters;

    if (!Array.isArray(newChapters)) {
      console.error("Dữ liệu tải lên không phải là một mảng.");
      return;
    }

    setExamForm({
      ...examForm,
      chapters: [...examForm.chapters, ...newChapters],
    });
  };

  const addFirstChapter = () => {
    if (examForm.chapters.length === 0) {
      addChapterToChapters();
    }
  };

  const clickContinue = () => {
    setShowForm(true);
    addFirstChapter();
  };

  const navigate = useNavigate(); // Khởi tạo navigate

  const handleSendExamForm = async (e) => {
    e.preventDefault();
  
    // Lấy username từ localStorage
    const username = localStorage.getItem("username");
  
    // Thêm username vào examForm
    const examFormWithUsername = {
      ...examForm,
      teacherID: username || "", // Nếu không có username, dùng chuỗi rỗng
    };
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}teacher/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examFormWithUsername),
      });
  
      if (response.ok) {
        alert("Đã tạo bài thi thành công!");
        navigate("/teacher/exam"); // Điều hướng đến trang /teacher/exam
      } else {
        console.error("Lỗi khi gửi dữ liệu:", response.statusText);
        alert("Có lỗi xảy ra khi gửi dữ liệu.");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      alert("Có lỗi xảy ra khi gửi dữ liệu.");
    }
  };

  return (
    <div className="exam">
      <div className="border-2 px-5 pt-5 pb-2 rounded-md">
        <TitleExam
          examForm={examForm}
          handleChangeExamForm={handleChangeExamForm}
        ></TitleExam>

        <button
          onClick={() => clickContinue()}
          type="button"
          id="formContentExam"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Tiếp tục
        </button>

        <div className="relative w-full mx-auto mt-10 h-full">
          {showForm && (
            <>
              <ChapterList
                examForm={examForm}
                setExamForm={setExamForm}
                addChapterToChapters={addChapterToChapters}
                addQuestionToQuestions={addQuestionToQuestions}
                addDataUploadToChapters={addDataUploadToChapters}
              />

              <button
                type="button"
                onClick={handleSendExamForm}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Tạo đề (Gửi Json qua Server)
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionsExam;