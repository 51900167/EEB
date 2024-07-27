import React from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";


const ShortDocument = ({
  question,
  indexQuestion,
  indexChapter,
  handleChangeQuestion,
  handleChangeOptionsDocQuestion,
  handleCorrectAnswerChangeDoc,
  addOptionsDoc,
  deleteOptionsDoc,
}) => {
  return (
    <div className="shortDocument">
      {/* Title Question */}
      <div className="relative z-0 w-[80%] mb-5 group">
        <textarea
          type="text"
          id="floating_text"
          name="titleQuestion"
          value={question.titleQuestion}
          onChange={(e) => handleChangeQuestion(indexChapter, indexQuestion, e)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
        />
        <label
          htmlFor="floating_text"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Câu hỏi đục lỗ: <span className="text-red-500">*</span>
        </label>
      </div>

      <div className="flex flex-col">
        {question.optionsDoc.map((optionDoc, indexOptionDoc) => (
          <div className="answer flex items-center pr-2" key={indexOptionDoc}>
            {optionDoc.map((optionDocChil, indexOptionDocChil) => (
              <div key={indexOptionDocChil} className="flex items-center pt-2">
                {/* Raido answer correct */}
                <input
                  htmlFor="ans1"
                  id={`ans${indexOptionDocChil}`}
                  type="checkbox"
                  name={`correctAnswer-${indexQuestion}`}
                  value={optionDocChil}
                  onChange={(e) =>
                      handleCorrectAnswerChangeDoc(indexChapter, indexQuestion, indexOptionDoc, indexOptionDocChil, e.target.value)
                    }
                  checked={question.answerDoc[indexOptionDoc] === optionDocChil && optionDocChil !== ""}
                  className="mr-1 w-5 h-5 text-green-600 mt-1"
                />
                {/* Input Answer */}
                <input
                  type="text"
                  id={`ansShortDoc-${indexChapter}-${indexQuestion}`}
                  value={optionDocChil}
                  onChange={(e) => {
                    handleChangeOptionsDocQuestion(indexChapter, indexQuestion, indexOptionDoc, indexOptionDocChil, e.target.value);
                  }}
                  className="w-full mr-2 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-2"
                  placeholder={`Câu trả lời ${indexOptionDocChil + 1}`}
                  required
                />
              </div>
            ))}
            {/* Button xóa answer */}
            <button
              type="button"
              onClick={() =>
                deleteOptionsDoc(indexChapter, indexQuestion, indexOptionDoc)
              }
              className="pt-2"
            >
              <MdCancel size={20} color="red"/>
            </button>
          </div>
        ))}

        <div className="addAnser mt-5 w-full flex items-center justify-center">
          <div className="addAnswer cursor-pointer hover:bg-gray-200 w-[40px] h-[40px] flex items-center justify-center pt-1 rounded-full">
            <div className="relative group">
              <button
                type="button"
                onClick={() => addOptionsDoc(indexChapter, indexQuestion)}
              >
                <IoIosAddCircle size={35}/>
              </button>
              <div className="absolute shadow-lg hidden group-hover:block bg-[#333] text-white font-semibold px-1 text-[10px] left-full ml-7 top-0 bottom-0 my-auto h-max w-max rounded before:w-2 before:h-2 before:rotate-45 before:bg-[#333] before:absolute before:z-[-1] before:bottom-0 before:top-0 before:my-auto before:-left-1 before:mx-auto">
                Thêm đáp án
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortDocument;
