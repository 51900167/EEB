// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const studentExamSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    startTime: { type: Date },
    endTime: { type: Date },
    answers: [{ 
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        answer: { type: String },
    }],
    score: { type: Number },
});

const StudentExam = mongoose.model('StudentExam', studentExamSchema);

export default StudentExam;
