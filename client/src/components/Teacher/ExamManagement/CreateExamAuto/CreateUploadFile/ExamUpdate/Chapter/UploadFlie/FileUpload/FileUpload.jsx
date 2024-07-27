import React, { useState, useEffect } from "react";
import { FaFileWord, FaFileExcel } from 'react-icons/fa'; 
import UploadFileWord from "./UploadFileWord";
import UploadFileExcel from "./UploadFileExcel";

const UploadFile = ({ sendDataToExam }) => {
  // State để lưu trữ tên của file được tải lên
  const [fileName, setFileName] = useState("");
  // State bỏ icon tải lên
  const [iconshow, setIconShow] = useState(true);
  const handshowIcon = () => {
    setIconShow(false);
  };

  const [fileType, setFileType] = useState(""); // New state to track the file type

  // State để lưu trữ URL của hình ảnh file được tải lên
  const [fileImageUrl, setFileImageUrl] = useState("");

  // State để lưu trữ file để đưa qua prop con (Word or Excel)
  const [sendFileToChildren, setSendFileToChildren] = useState();

  // Hàm xử lý khi tải file lên
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Lấy file đầu tiên từ input
    console.log("file chua gui: ", file);

    if (file) {
      setFileName(file.name); // Đặt state tên file

      // Kiểm tra loại file và đặt URL hình ảnh tương ứng
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension === "doc" || fileExtension === "docx") {
        setFileType("word"); // Set file type to 'word'
        setFileImageUrl(FaFileWord); // Đặt đường dẫn tới hình ảnh file Word
      } else if (fileExtension === "xls" || fileExtension === "xlsx") {
        setFileType("excel"); // Set file type to 'excel'
        setFileImageUrl(FaFileExcel); // Đặt đường dẫn tới hình ảnh file Excel
      } else {
        setFileImageUrl(URL.createObjectURL(file)); // Đặt URL hình ảnh của file tải lên nếu không phải Word hoặc Excel
      }

      // Ensure state update before proceeding
      setSendFileToChildren(file); // Chuyển file qua cho UploadFileExcel.jsx xử lý
    }

    handshowIcon(); // ẩn icon upload
  };
  console.log("data send to ulf:", sendDataToExam)

  useEffect(() => {
    if (sendFileToChildren) {
      console.log("File updated:", sendFileToChildren);
    }
  }, [sendFileToChildren]);

  return (
    <div className="rounded-lg border-2 border-gray-200 border-dashed mt-6">
      <div className="p-4 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer">
        {iconshow && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 mb-4 fill-gray-600 inline-block"
              viewBox="0 0 32 32"
            >
              <path
                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                data-original="#000000"
              />
              <path
                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                data-original="#000000"
              />
            </svg>
          </div>
        )}

        {fileName && (
          <div className="mt-4 flex flex-col items-center">
            <img
              src={fileImageUrl}
              alt="Uploaded file"
              className="w-20 h-20 object-cover mb-2"
            />
            <p className="text-gray-600">{fileName}</p>
          </div>
        )}

        {fileType === "word" && sendFileToChildren && (
          <UploadFileWord
            sendDataToExam={sendDataToExam}
            sendFileToChildrenWord={sendFileToChildren}
          />
        )}

        {fileType === "excel" && sendFileToChildren && (
          <UploadFileExcel
            sendDataToExam={sendDataToExam}
            sendFileToChildrenExcel={sendFileToChildren}
          />
        )}

        <h4 className="text-sm text-gray-600">
          Drag & Drop or{" "}
          <label htmlFor="chooseFile" className="text-blue-600 cursor-pointer">
            Choose file
          </label>{" "}
          to upload
        </h4>
        <input
          onChange={handleFileUpload}
          type="file"
          id="chooseFile"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default UploadFile;
