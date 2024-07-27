import React from "react";

const Mulchoise = ({
  question,
  indexQuestion,
  indexChapter,
  handleChangeQuestion,
  handleCorrectAnswerChange,
  handleChangeOptionsQuestion,
}) => {
  return (
    <div className="mulChoise">
      {/* Title Question */}
      <div className="relative z-0 w-[80%] mb-5 group">
        <input
          type="text"
          id="floating_text"
          name="titleQuestion"
          value={question.titleQuestion}
          onChange={(e) =>
            handleChangeQuestion(indexChapter, indexQuestion, e)
          }
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
        />
        <label
          htmlFor="floating_text"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Câu hỏi trắc nghiệm: <span className="text-red-500">*</span>
        </label>
      </div>

      <div>
        {question.options.map((option, indexOption) => (
          <div key={indexOption} className="flex items-center pt-2">
            {/* Raido answer correct */}
            <input
              htmlFor="ans1"
              id={`ans${indexOption}`}
              type="checkbox"
              name={`correctAnswer-${indexQuestion}`}
              value={indexOption}
              onChange={(e) =>
                handleCorrectAnswerChange(indexChapter, indexQuestion, e.target.value) // e.target.value === indexOption
              }
              className="mr-3 w-5 h-5 text-green-600 mt-1"
              checked={question.answer === indexOption.toString()}
            />
            {/* Input Answer */}
            <input
              type="text"
              id="ans1"
              value={option}
              onChange={(e) =>
                handleChangeOptionsQuestion(indexChapter,indexQuestion, {
                  ...question,
                  options: question.options.map((a, j) =>
                    j === indexOption ? e.target.value : a
                  ),
                })
              }
              className="w-[30%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer pl-2"
              placeholder={`Câu trả lời ${indexOption + 1}`}
              required
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mulchoise;
