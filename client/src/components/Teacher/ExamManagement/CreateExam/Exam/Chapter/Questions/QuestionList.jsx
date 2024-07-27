import React from "react";
import { IoMdCopy } from "react-icons/io";
import { BsTrash3Fill } from "react-icons/bs";
import Mulchoise from "./TypeQuestion/Mulchoise";
import FillTheValue from "./TypeQuestion/FillTheValue";
import ShortDocument from "./TypeQuestion/ShortDocument";
import Listenning from "./TypeQuestion/Listenning";
import Stress from "./TypeQuestion/Stress";
import ShortAnswer from "./TypeQuestion/ShortAnswer";

const QuestionList = ({
  chapter,
  question,
  handleSelectTypeQuestion,
  handleCorrectAnswerChange,
  handleChangeOptionsQuestion,
  handleCorrectAnswerChangeDoc,
  handleChangeOptionsDocQuestion,
  addQuestion,
  deleteQuestion,
  indexChapter,
  indexQuestion,
  handleChangeQuestion,
  getLevel,

  /*Kéo thả => */ onDragStart,
  onDrop,
  onDragOver,

  addAnswer,
  addOptionsDoc,
  deleteOptionsDoc,
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, indexQuestion, indexChapter)}
      onDrop={(e) => onDrop(e, indexQuestion, indexChapter)}
      onDragOver={(e) => onDragOver(e)}
      className="question-item"
    >
      <div className="question space-y-2 border-2 mt-7 px-5 mb-5">
        <div className="text-end">
          <div className="typeQuestion">
            <label
              htmlFor="countries"
              className="pt-1 text-sm font-medium text-gray-900 dark:text-white mr-3"
            >
              Chọn loại đề:
            </label>

            <select
              className="text-sm border-2"
              value={question.type}
              onChange={(e) =>
                handleSelectTypeQuestion(question.questionID, e.target.value)
              }
            >
              <option value="">----------</option>
              <option value="trắc nghiệm">Trắc nghiệm</option>
              <option value="điền khuyết">Điền khuyết</option>
              <option value="đục lỗ">Đục lỗ(1 đoạn văn bản)</option>
              <option value="nghe">Nghe</option>
              <option value="trọng âm">Trọng âm</option>
              <option value="shortAnswer">Câu hỏi ngắn</option>
            </select>
          </div>
        </div>

        {/* Phần Option */}
        <div className="optionQuestion">
          {/* <p>Option đã chọn: {question.selectedOption}</p> */}

          {question.type === "trắc nghiệm" && (
            <>
              <Mulchoise
                question={question}
                handleChangeQuestion={handleChangeQuestion}
                indexChapter={indexChapter}
                indexQuestion={indexQuestion}
                handleCorrectAnswerChange={handleCorrectAnswerChange}
                handleChangeOptionsQuestion={handleChangeOptionsQuestion}
              />
            </>
          )}
          {question.type === "điền khuyết" && (
            <>
              <FillTheValue
                question={question}
                handleChangeQuestion={handleChangeQuestion}
                indexChapter={indexChapter}
                indexQuestion={indexQuestion}
                handleCorrectAnswerChange={handleCorrectAnswerChange}
                handleChangeOptionsQuestion={handleChangeOptionsQuestion}
              />
            </>
          )}
          {question.type === "đục lỗ" && (
            <>
              <ShortDocument
                question={question}
                handleChangeQuestion={handleChangeQuestion}
                indexChapter={indexChapter}
                indexQuestion={indexQuestion}
                handleCorrectAnswerChange={handleCorrectAnswerChange}
                handleChangeOptionsQuestion={handleChangeOptionsQuestion}
                handleChangeOptionsDocQuestion={handleChangeOptionsDocQuestion}
                handleCorrectAnswerChangeDoc={handleCorrectAnswerChangeDoc}
                
                addAnswer={addAnswer}
                addOptionsDoc={addOptionsDoc}
                deleteOptionsDoc={deleteOptionsDoc}
              />
            </>
          )}
          {question.type === "nghe" && (
            <>
              <Listenning
                question={question}
                handleChangeQuestion={handleChangeQuestion}
                indexChapter={indexChapter}
                indexQuestion={indexQuestion}
                handleCorrectAnswerChange={handleCorrectAnswerChange}
                handleChangeOptionsQuestion={handleChangeOptionsQuestion}
              />
            </>
          )}
          {question.type === "trọng âm" && (
            <>
              <Stress
                question={question}
                handleChangeQuestion={handleChangeQuestion}
                indexChapter={indexChapter}
                indexQuestion={indexQuestion}
                handleCorrectAnswerChange={handleCorrectAnswerChange}
                handleChangeOptionsQuestion={handleChangeOptionsQuestion}
              />
            </>
          )}
          {question.type === "shortAnswer" && (
            <>
              <ShortAnswer
                question={question}
                handleChangeQuestion={handleChangeQuestion}
                indexChapter={indexChapter}
                indexQuestion={indexQuestion}
                handleCorrectAnswerChange={handleCorrectAnswerChange}
                handleChangeOptionsQuestion={handleChangeOptionsQuestion}
              ></ShortAnswer>
            </>
          )}
        </div>

        <div className="text-end pt-10 flex items-center justify-between">
          {/* Radio Button Dễ, Trung bình, Khó */}
          <div className="flex gap-2 items-center">
            <h2 className="font-bold text-sm">Mức độ: </h2>
            <div className="flex">
              <div className="flex items-center me-4">
                <input
                  id={`radio-easy-${indexChapter}-${indexQuestion}`}
                  type="radio"
                  value="Dễ"
                  name={`inline-radio-group-${indexChapter}-${indexQuestion}`}
                  onClick={(e) =>
                    getLevel(indexChapter, indexQuestion, e.target.value)
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={`radio-easy-${indexChapter}-${indexQuestion}`}
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Dễ
                </label>
              </div>
              <div className="flex items-center me-4">
                <input
                  id={`radio-nomal-${indexChapter}-${indexQuestion}`}
                  type="radio"
                  value="Trung bình"
                  name={`inline-radio-group-${indexChapter}-${indexQuestion}`}
                  onClick={(e) =>
                    getLevel(indexChapter, indexQuestion, e.target.value)
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={`radio-nomal-${indexChapter}-${indexQuestion}`}
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Trung bình
                </label>
              </div>
              <div className="flex items-center me-4">
                <input
                  id={`radio-hard-${indexChapter}-${indexQuestion}`}
                  type="radio"
                  value="Khó"
                  name={`inline-radio-group-${indexChapter}-${indexQuestion}`}
                  onClick={(e) =>
                    getLevel(indexChapter, indexQuestion, e.target.value)
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={`radio-hard-${indexChapter}-${indexQuestion}`}
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Khó
                </label>
              </div>
            </div>
          </div>

          {/* Button icon */}
          <div className="">
            <button className="px-4" type="button">
              <IoMdCopy size={42} onClick={addQuestion} />
            </button>
            <button className="px-4" type="button">
              <BsTrash3Fill
                size={39}
                onClick={() =>
                  deleteQuestion(chapter.chapterID, question.questionID)
                }
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
