import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { MdOutlineTimer, MdOutlineFileDownload } from "react-icons/md";

const ExamDetail = () => {
  const typeAnswer = ["A.", "B.", "C.", "D."];
  const componentRef = useRef();

  const handlePrint = async () => {
    const input = componentRef.current;
    const pdf = new jsPDF("p", "mm", "a4");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("ExamDownload.pdf");
  };

  const { examId } = useParams();
  console.log("id: ", examId);
  const [exam, setExam] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}teacher/exam/${examId}`);
        
        // Kiểm tra nếu phản hồi không phải là 200 (OK)
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu đề thi');
        }
  
        const data = await response.json();
        setExam(data);

      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu đề thi:', error);
      }
    };
  
    fetchExam();
  }, [examId]);

  console.log("Exam for Id: ", exam);

  if (!exam) return <div>Loading...</div>;

  return (
    <div className="">
      <div className="buttonBackPage flex items-center justify-center bg-green-500 py-2">
        <div className="w-full flex items-center justify-center gap-2 py-1">
          <MdOutlineTimer size={30} />
          <h2 className="text-2xl font-bold">{exam.time}</h2>
        </div>
        <div className="button-download relative group cursor-pointer hover:bg-white w-[40px] h-[40px] flex items-center justify-center p-1 rounded-full mr-2">
          <button type="button" onClick={handlePrint}>
            <MdOutlineFileDownload size={25} />
          </button>
          <div className="absolute shadow-lg hidden group-hover:block bg-[#333] text-white font-semibold px-1 text-[10px] right-full mr-3 top-0 bottom-0 my-auto h-max w-max rounded before:w-2 before:h-2 before:rotate-45 before:bg-[#333] before:absolute before:z-[-1] before:bottom-0 before:top-0 before:my-auto before:-right-1 before:mx-auto">
            Tải xuống
          </div>
        </div>
      </div>
      <div ref={componentRef} className="containerPreviewExam mt-5" style={{ width: "210mm", minHeight: "297mm"}}>
        <div className="titleExam">
          <h1>{exam.titleExam}</h1>
          <div className="flex flex-col text-end">
            <p className="text-xs">
              <b>Lớp:</b> {exam.classExam}
            </p>
            <p className="text-xs">
              <b>Thời gian:</b> {exam.time}
            </p>
            <p className="text-xs">
              <b>Điểm:</b> {exam.score}
            </p>
          </div>
        </div>

        {exam.chapters.map((chapter, indexChapter) => (
          <div key={chapter._id || indexChapter} className="chapter pb-5">
            <h2>{chapter.titleChapter}</h2>
            {chapter.questions.map((question, questionIndex) =>
              question.type === "điền khuyết" ? (
                <div key={question._id || questionIndex}>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="font-bold">
                      {questionIndex + 1}
                      {". "}
                    </p>
                    <h5
                      className="flex text-justify text-[20px]"
                      dangerouslySetInnerHTML={{
                        __html: question.titleQuestion,
                      }}
                    ></h5>
                  </div>
                  <div className="answer flex gap-2">
                    <table className="w-full">
                      <tbody>
                        <tr className="flex justify-between">
                          {question.options.map((option, indexOption) => (
                            <td
                              key={indexOption}
                              className="py-1 px-1 text-left w-[150px] flex items-center gap-1"
                            >
                              <p>{typeAnswer[indexOption]}</p>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: option,
                                }}
                              />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : question.type === "nghe" ? (
                <div key={question._id || questionIndex}>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="font-bold">
                      {questionIndex + 1}
                      {". "}
                    </p>
                    <h5
                      className="flex text-justify text-[20px]"
                      dangerouslySetInnerHTML={{
                        __html: question.titleQuestion,
                      }}
                    ></h5>
                  </div>
                  <div className="answer flex gap-2">
                    <table className="w-full">
                      <tbody>
                        <tr className="flex flex-col justify-between">
                          {question.options.map((option, indexOption) => (
                            <td
                              key={indexOption}
                              className="py-1 px-1 text-left w-full flex items-center gap-1"
                            >
                              <p>{typeAnswer[indexOption]}</p>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: option,
                                }}
                              />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : question.type === "shortAnswer" ? (
                <div key={question._id || questionIndex}>
                  <div className="titleShortAnswer flex items-center gap-2 mt-2">
                    <p className="font-bold">
                      {questionIndex + 1}
                      {". "}
                    </p>
                    <h5
                      className="flex text-justify text-[20px]"
                      dangerouslySetInnerHTML={{
                        __html: question.titleQuestion,
                      }}
                    ></h5>
                  </div>
                  <div className="answer flex gap-2 items-center mt-1">
                    <p>Đáp án: </p>
                    <input
                      type="text"
                      className="w-[80%] border-b-2 border-black"
                    />
                  </div>
                </div>
              ) : question.type === "đục lỗ" ? (
                <div key={question._id || questionIndex}>
                  <h5
                    className="flex text-justify text-[20px] mt-1"
                    dangerouslySetInnerHTML={{
                      __html: question.titleQuestion,
                    }}
                  ></h5>
                  <div className="answer flex gap-2 mt-3">
                    <table className="w-full">
                      <tbody>
                        <tr className="flex flex-col justify-between">
                          {console.log(question.optionsDoc)}
                          {question.optionsDoc.map((optionDoc, indexOptionDoc) => (
                            <td
                              key={indexOptionDoc}
                              className="py-1 px-1 text-left w-full flex items-center gap-1"
                            >
                              <p className="font-bold">
                                {indexOptionDoc + 1}
                                {". "}
                              </p>
                              {optionDoc.map((optionDL, indexOptionDL) => (
                                <div key={indexOptionDL} className="w-[90%] flex gap-2">
                                  <p>{typeAnswer[indexOptionDL]}</p>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: optionDL,
                                    }}
                                  />
                                </div>
                              ))}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : question.type === "trọng âm" ? (
                <div key={question._id || questionIndex}>
                  <div className="flex items-center">
                    <p className="font-bold">
                      {questionIndex + 1}
                      {". "}
                    </p>
                    <div className="answer flex gap-2 w-full">
                      <table className="w-full">
                        <tbody>
                          <tr className="flex justify-between">
                            {question.options.map((option, indexOption) => (
                              <td
                                key={indexOption}
                                className="py-1 px-1 text-left w-[150px] flex items-center gap-1"
                              >
                                <p>{typeAnswer[indexOption]}</p>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: option,
                                  }}
                                />
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={questionIndex}></div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamDetail;
