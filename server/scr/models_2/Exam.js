const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subject: { type: String },
    description: { type: String },
    duration: { type: Number },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Draft', 'Pending Approval', 'Approved', 'Active', 'Completed'], default: 'Draft' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
