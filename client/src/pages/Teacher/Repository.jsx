import React from 'react'
import {Link} from 'react-router-dom'

// import CreateExam from '../src/components/Teacher/ExamManagement/CreateExam/CreateExam.jsx'
// import CreateExam from '../../components/Teacher/ExamManagement/CreateExam/CreateExam.jsx'

// import CreateExamAuto from "../../components/Teacher/ExamManagement/CreateExamAuto/CreateExamAuto";
import ExamWareHouse from "../../components/Teacher/ExamManagement/ShowExam/WarehouseExam/ExamWareHouse.jsx";
// /Users/tienphat/Code/DACNTT_2_BankExamEnglish/client/src/components/Teacher/ExamManagement/ShowExam/WarehouseExam/ExamWareHouse.jsx

function Repository() {
  return (
    <div>
      <button>
        <Link to="/teacher/repository/createexam">
          Create Exam
        </Link>
      </button>

      <button>
        <Link to="/teacher/repository/createexamauto">
          Create Exam Auto
        </Link>
      </button>

      <ExamWareHouse/>

    </div>
  )
}

export default Repository
