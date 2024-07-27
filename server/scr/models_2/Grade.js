const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    score: { type: Number },
    graderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
