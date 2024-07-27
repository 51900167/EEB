const mongoose = require('mongoose');

//COURSE
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    students: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;


// const mongoose = require('mongoose');

// const academicYearSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true, // Ensures only one active academic year exists
//     example: '2021-2022'
//   },
//   grade: {
//     type: String,
//     enum: ['Freshman', 'Sophomore', 'Junior', 'Senior'], // Grade levels
//     required: true
//   },
//   startDate: {
//     type: Date,
//     required: true
//   },
//   endDate: {
//     type: Date,
//     required: true
//   },
//   isActive: {
//     type: Boolean,
//     default: true // Marks the current academic year as active
//   }
// });

// academicYearSchema.pre('save', async function (next) {
//   // If saving a new active year, deactivate any existing active year
//   if (this.isActive) {
//     await AcademicYear.findOneAndUpdate({ isActive: true }, { isActive: false });
//   }
//   next();
// });

// const AcademicYear = mongoose.model('AcademicYear', academicYearSchema);

// module.exports = AcademicYear;
