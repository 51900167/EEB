import React, { useState } from "react";
import TitleExam from "./TitleExam/TitleExam";
import ChapterList from "./Chapter/ChapterList";
import { useNavigate } from "react-router-dom";

const ExamUpdate = ({ examForID }) => {
  const [showForm] = useState(true);
  const [examForm, setExamForm] = useState(examForID); // Cho examForID tương ứng sao examForm

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

  const navigation = useNavigate();
  const handleSendExamFormUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examForm),
      });

      if (response.status === 200) {
        alert("Đã cập nhật bài thi thành công!");
        navigation("/teacher/exam");
      } else {
        alert("Có lỗi xảy ra khi cập nhật bài thi!");
      }

      resetPage();
    } catch (error) {
      console.error("Error updating exam:", error);
      alert("Có lỗi xảy ra khi cập nhật bài thi!");
    }
  };

  const resetPage = () => {
    window.location.reload();
  };

  console.log(JSON.stringify(examForm, null, 2));

  return (
    <div className="exam">
      <div className="border-2 px-5 pt-5 pb-2 rounded-md">
        <TitleExam
          examForm={examForm}
          handleChangeExamForm={handleChangeExamForm}
        ></TitleExam>

        <div className="relative w-full mx-auto mt-10 h-full">
          {showForm && (
            <>
              <ChapterList
                examForm={examForm}
                setExamForm={setExamForm}
                addChapterToChapters={addChapterToChapters}
                addQuestionToQuestions={addQuestionToQuestions}
              />

              <button
                type="submit"
                onClick={handleSendExamFormUpdate}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Cập nhật đề (Gửi Update Json qua Server)
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamUpdate;