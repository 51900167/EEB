const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    type: { type: String, enum: ['Multiple Choice', 'True/False', 'Essay'], required: true },
    content: { type: String, required: true },
    options: [{ type: String }], // Only for Multiple Choice and True/False questions
    correctAnswer: { type: String }, // For Multiple Choice and True/False questions
    score: { type: Number }, // Score for the question`
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
