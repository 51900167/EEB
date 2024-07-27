// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
/* import { FiFilter } from "react-icons/fi"; */
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TbListDetails } from "react-icons/tb";
import ExamUpdate from "./ExamUpdate/ExamUpdate"; // import để chuyển Exam có Id tương ứng từ client
import removeAccents from "remove-accents"; // Thư viên loại bỏ dấu khi search
import ExamDetail from "../HistoryExam/ExamDetail.jsx";
// import axios from "axios";
// URL de ket noi qua server
// axios.defaults.baseURL = "http://localhost:8000/";

const ExamWareHouse = () => {
  // Search Exam

  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [filteredExamList, setFilteredExamList] = useState([]); // Filtered list

 /*  const [isOpen, setIsOpen] = useState(false); */

  // Show ExamList
  const [ExamList, setExamList] = useState([]);

  // Hàm lấy dữ liệu từ server
  const getDataFromServer = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}teacher`); // Thay đổi đường dẫn API nếu cần
      const data = await response.json();
      setExamList(data);
      setFilteredExamList(data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu từ server:', error);
    }
  };

  // Gọi hàm lấy dữ liệu khi component mount
  useEffect(() => {
    getDataFromServer();
  }, []);

  // search
  useEffect(() => {
    // Filter exams based on search query
    const normalizedSearchQuery = removeAccents(searchQuery.toLowerCase());
    const filtered = ExamList.filter(
      (exam) =>
        removeAccents(exam.titleExam.toLowerCase()).includes(normalizedSearchQuery) ||
        removeAccents(exam.description.toLowerCase()).includes(normalizedSearchQuery) ||
        removeAccents(exam.time.toLowerCase()).includes(normalizedSearchQuery)
    );
    setFilteredExamList(filtered);
  }, [searchQuery, ExamList]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  /* button Update */
  // Button xem Chi tiet tung Exam
  const [showDiv, setShowDiv] = useState(false);
  const [moveDiv, setMoveDiv] = useState(false);

  const handleShowDiv = () => {
    setShowDiv(true);
    setMoveDiv(true);
  };

  // Ẩn xem trước Update Form
  const handleHideDiv = () => {
    setMoveDiv(false);
    setTimeout(() => {
      setShowDiv(false);
    }, 500); // Thời gian delay phải khớp với thời gian animation
  };

  // Data cua tung ID Exam cần Update
  const [examForID, setExamForID] = useState();

  // function lay id khi click chi tiet Exam
  const handleExamIDUpdate = (id) => {
    let dataForID;
    ExamList.map((exam) => {
      if (id === exam._id) {
        console.log("Exam tuong ung:", exam);
        dataForID = exam;
      }
      return dataForID;
    });
    setExamForID(dataForID);

    handleShowDiv();

    console.log("Dau ra: ", dataForID);
  };

  // button delete
  const deleteExam = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}teacher/delete/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Nếu bạn có token hoặc cần thêm các headers khác, hãy thêm ở đây
          // 'Authorization': `Bearer ${token}`
        },
      });
  
      // Kiểm tra nếu phản hồi không phải là 200 (OK)
      if (!response.ok) {
        throw new Error('Lỗi khi xóa đề thi');
      }
  
      // Cập nhật danh sách đề thi
      setExamList(ExamList.filter((exam) => exam._id !== id));
      setFilteredExamList(filteredExamList.filter((exam) => exam._id !== id));
    } catch (error) {
      console.error('Lỗi khi xóa đề thi:', error);
    }
  };

  

  return (
    <>
      <div className="contentHistory flex flex-col px-64 shadow-top pt-5">
        {/* Button Create Exam */}
        <div className="flex w-full justify-end">
          {/* <Link to="/teacher/exam/createExam">
            <button
              className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full items-center"
              type="button"
            >
              Tạo đề tiếng anh{" "}
              <FaPlusCircle className="ml-2 text-4xl py-1 font-bold" />
            </button>
          </Link> */}
        </div>

        {/* Filter */}
        <div className="filterContainer w-full flex bg-white py-5">
          <div className="relative z-0 w-full group flex items-center justify-end">
            <div className="searchContainer flex w-[30%]">
              <input
                type="text"
                name="search_text"
                id="floating_text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={searchQuery}
                onChange={handleSearchChange}
                required
              />
              
              <IoMdSearch className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500" />
              
              <label
                htmlFor="search_text"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-35 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Tìm kiếm
              </label>
            </div>
            
          </div>
        </div>

        {/* Table List Exam Teacher */}
        <div className="overflow-x-auto font-[sans-serif]">
          <table className="min-w-full bg-white">
            <thead className="whitespace-nowrap">
              <tr>
                <th className="p-4 text-center text-sm font-semibold text-black">
                  STT
                </th>
                <th className="p-4 text-center text-sm font-semibold text-black">
                  Tiêu đề bài thi
                </th>
                <th className="p-4 text-center text-sm font-semibold text-black">
                  Mô tả
                </th>
                <th className="p-4 text-center text-sm font-semibold text-black">
                  Lớp
                </th>
                <th className="p-4 text-center text-sm font-semibold text-black">
                  Thời gian
                </th>
                <th className="p-4 text-center text-sm font-semibold text-black">
                  Điểm
                </th>
                <th className="p-4 text-center text-sm font-semibold text-black">
                  Tùy chỉnh
                </th>
              </tr>
            </thead>

            <tbody className="whitespace-nowrap">
              {filteredExamList.length !== 0 ? (
                filteredExamList.map((exam, indexExam) => (
                  <tr
                    key={indexExam}
                    className="odd:bg-blue-50 hover:bg-gray-100"
                  >
                    <td className="w-[20px] px-6 text-sm">
                      <div className="cursor-pointer w-max">
                        {indexExam + 1}
                      </div>
                    </td>
                    <td className="w-[200px] p-4 text-sm">
                      <div className="flex items-center cursor-pointer break-words whitespace-normal">
                        {exam.titleExam}
                      </div>
                    </td>
                    <td className="w-[300px] p-4 text-sm">
                      <div
                        className="flex items-center cursor-pointer break-words whitespace-normal"
                        title={exam.description}
                      >
                        {exam.description}
                      </div>
                    </td>
                    <td className="p-4 text-sm">
                      <div className="flex items-center cursor-pointer w-max">
                        {exam.classExam}
                      </div>
                    </td>
                    <td className="p-4 px-6 text-sm">
                      <div className="flex items-center cursor-pointer w-max">
                        {exam.time}
                      </div>
                    </td>
                    <td className="p-4 px-6 text-sm">
                      <div className="flex items-center cursor-pointer w-max">
                        {exam.score}
                      </div>
                    </td>
                    <td className="p-4 text-sm">
                      <div className="flex items-center cursor-pointer w-max">
                        {/* Button Update */}
                        <button
                          type="button"
                          onClick={() => handleExamIDUpdate(exam._id)}
                          className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                        >
                          <HiPencilAlt size={25} />
                        </button>
                        
                        {/* Button detail */}
                        <button
                          type="button"
                          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                          <Link to={`/teacher/exam/${exam._id}`}>
                            <TbListDetails size={25} />
                          </Link>
                        </button>

                        {/* Button delete */}
                        <button
                          type="button"
                          onClick={() => deleteExam(exam._id)}
                          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          <MdDelete size={25} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="w-full">
                  <td colSpan="7" className="text-center">
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="md:flex m-4 justify-end">
            <div className="flex items-center max-md:mt-4">
              <div className="border flex rounded divide-x-2 border-gray-400 divide-gray-400">
                <button
                  type="button"
                  className="px-4 py-2 hover:bg-blue-50 text-sm"
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="px-4 py-2 hover:bg-blue-50 text-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show Form Update */}
      {showDiv && (
        <div className={`preview-div flex-col ${moveDiv ? "move" : ""}`}>
          {/* Button Close page preview */}
          <div className="buttonBackPage flex items-center justify-center bg-green-500 py-2">
            {/* Button back */}
            <div className="button-close relative group cursor-pointer hover:bg-white w-[40px] h-[40px] flex items-center justify-center p-1 rounded-full">
              <button onClick={handleHideDiv} type="button" className="">
                <IoMdArrowRoundBack size={25} />
              </button>
              <div className="absolute shadow-lg hidden group-hover:block bg-[#333] text-white font-semibold px-1 text-[10px] left-full ml-2 top-0 bottom-0 my-auto h-max w-max rounded before:w-2 before:h-2 before:rotate-45 before:bg-[#333] before:absolute before:z-[-1] before:bottom-0 before:top-0 before:my-auto before:-left-1 before:mx-auto">
                Trở về
              </div>
            </div>
            {/* Time */}
            <div className="w-full flex items-center justify-center gap-2 py-1">
              <h2 className="text-2xl font-bold">
                {`Cập nhật bài thi `}
                {examForID.titleExam}
              </h2>
            </div>
          </div>
          {/* Preview Exam */}
          <div className="containerPreviewExam mt-5">
            <form className="formExam w-full mx-auto" /* onSubmit={sendData} */>
              <ExamUpdate
                examForID={
                  examForID
                } /* examForID: data có ID Exam cần Update tương ứng */
              />
            </form>
          </div>
        </div>
      )}
      {/* Full page preview */}
    </>
  );
};

export default ExamWareHouse;
