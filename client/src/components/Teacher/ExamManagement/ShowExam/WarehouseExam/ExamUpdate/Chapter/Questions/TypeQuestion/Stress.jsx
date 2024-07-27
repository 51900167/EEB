/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef} from "react";
import { RiFormatClear } from "react-icons/ri";
import { FaUnderline } from "react-icons/fa6";


const Stress = ({
  question,
  indexChapter,
  indexQuestion,
  handleCorrectAnswerChange,
  handleChangeOptionsQuestion,
}) => {
  // Ham bo tag <u>
  const removeUTags = (text) => {
    return text.replace(/<\/?u>/g, '');
  }

  // Khởi tạo useRef ngoài callback
  const answerRefs = useRef(question.options.map(() => useRef(null)));

  // Xử lý khi bôi đen chữ và thêm đánh dấu gạch dưới
  const handleUnderlineSelectedText = (indexQuestion, indexOption) => {
    const input = answerRefs.current[indexOption].current;
    if (input) {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const text = input.value;

      if (start !== end) {
        const underlinedText = `${text.slice(0, start)}<u>${text.slice(
          start,
          end
        )}</u>${text.slice(end)}`;

        const newOptions = question.options.map((opt, i) =>
          i === indexOption ? underlinedText : opt
        );

        console.log("newOptions: ", newOptions);
        handleChangeOptionsQuestion(indexChapter, indexQuestion, {
          ...question,
          options: newOptions,
        });
      }
    }
  };

  // Clear underline
  const handleClearUnderline = (indexQuestion, indexOption) => {
    const newOptions = question.options.map((opt, z) =>
      z === indexOption ? opt.replace(/<\/?u>/g, "") : opt
    );
    handleChangeOptionsQuestion(indexChapter, indexQuestion, {
      ...question,
      options: newOptions,
    });
  };

  return (
    <div className="stress">
      {/* Title Question */}
      <h2 className="mb-2 text-sm font-bold">Câu hỏi đánh trọng âm</h2>

      <div>
        {question.options.map((option, indexOption) => (
          <div key={indexOption} className="flex items-center pt-2">
            {/* Radio answer correct */}
            <input
              type="checkbox"
              id={`correctAnswer-${indexOption}`}
              name={`correctAnswer-${indexOption}`}
              value={removeUTags(option)}
              onChange={(e) =>
                handleCorrectAnswerChange(
                  indexChapter,
                  indexQuestion,
                  e.target.value,
                )
              }
              className="mr-3 w-5 h-5 text-green-600 mt-1"  
              checked={question.answer === removeUTags(option)}
            />
            
            {/* Input Answer */}
            <input
              type="text"
              id={`ans${indexOption}`}
              ref={answerRefs.current[indexOption]}
              value={option.replace(/<\/?u>/g, "")} // Loại bỏ các thẻ tag trong input | Tại vì làm cái đục lỗ nên cho option[0]
              onChange={(e) =>
                handleChangeOptionsQuestion(indexChapter, indexQuestion, {
                  ...question,
                  options: question.options.map((opt, i) =>
                    i === indexOption ? e.target.value : opt
                  ),
                })
              }
              className="w-[30%] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer pl-2"
              placeholder={`Câu trả lời ${indexOption + 1}`}
              required
            />

            {/* Button Underline */}
            <div className="button flex items-center justify-center gap-2 ml-5">
              <button
                type="button"
                onClick={() =>
                  handleUnderlineSelectedText(indexQuestion, indexOption)
                }
              >
                <FaUnderline  size={25}/>
              </button>

              {/* Button clear Underline */}
              <button
                type="button"
                onClick={() => handleClearUnderline(indexQuestion, indexOption)}
              >
                <RiFormatClear size={30} />
              </button>

              <p
              dangerouslySetInnerHTML={{ __html: option }}
              className="mx-5 text-xl"
            />
            </div>

            

          </div>
        ))}
      </div>
    </div>
  );
};

export default Stress;
