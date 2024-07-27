const User = require("../models/User");
const SchoolYear = require("../models/SchoolYear");
const Class = require("../models/Class");
const Semester = require("../models/Semester");
const Score = require("../models/Score");

exports.getClasses = async (req, res) => {
  try {
    const { teacherId, semesterId } = req.query; // Lấy ID từ query parameters

    // Tìm các lớp học mà giáo viên dạy trong học kỳ
    const classes = await Class.find({ teacher: teacherId, semester: semesterId })
      .populate('teacher') // Điền thông tin giáo viên
      .exec();

    res.json(classes);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách lớp học và giáo viên:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách lớp học và giáo viên." });
  }
};

// Hàm lấy danh sách học kỳ
exports.getSemesters = async (req, res) => {
  try {
    const teacherId = req.query.teacherId; // Lấy ID từ query parameters

    const classes = await Class.find({ teacher: teacherId }).populate('semester');
    const semesters = [...new Set(classes.map(c => c.semester))];

    res.json(semesters);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách học kỳ cho giáo viên:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách học kỳ cho giáo viên." });
  }
};


exports.users =  async (req, res) => {
  const users = await User.find().select('-password'); // Không trả về mật khẩu
  res.json(users);
};


//Classses

exports.getclasses = async (req, res) => {
  try {
    const classes = await Class.find({ teacher: req.params.teacherId })
      .populate({
        path: 'semester',
        populate: {
          path: 'schoolYear'
        }
      })
      .populate({
        path: 'teacher',
        select: 'firstName lastName'
      })
      .populate({
        path: 'students',
        select: '-password' // Loại trừ trường password
      });
    res.status(200).json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Error fetching classes' });
  }
};


///// Nhập điểm

// Lấy thông tin chi tiết lớp học



exports.getClassesById = async (req, res) => {
  const { classId } = req.params;

  try {
    // Tìm lớp học theo classId
    const classDetails = await Class.findById(classId)
      .populate({
        path: 'teacher',
        select: 'firstName lastName'
      }) // Lấy thông tin giáo viên
      .populate({
        path: 'students',
        select: 'firstName lastName username' // Chỉ lấy firstName, lastName và email của sinh viên
      })// Lấy thông tin sinh viên
      .populate({
        path: 'semester',
        populate: {
          path: 'schoolYear',
          select: 'year'
        }
      }); // Lấy thông tin học kỳ và năm học

    if (!classDetails) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json(classDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch class details' });
  }
};

exports.saveScores = async (req, res) => {
  const { classId } = req.params;
  const { students } = req.body;

  try {
    if (!classId) {
      return res.status(400).json({ message: 'Class ID is required' });
    }

    const classDetails = await Class.findById(classId);
    if (!classDetails) {
      return res.status(404).json({ message: 'Class not found' });
    }

    const scoreUpdates = students.map(async (student) => {
      if (!student || !student._id) {
        console.error('Invalid student data:', student);
        return null;
      }

      let score = await Score.findOne({
        studentId: student._id,
        classId: classId
      });

      if (!score) {
        score = new Score({
          studentId: student._id,
          classId: classId,
        });
      }

      // Đảm bảo rằng các điểm được truyền vào đúng định dạng
      score.scores.oral = (student.oralScores || []).slice(0, 3);
      score.scores.fifteenMinutes = (student.fifteenMinuteScores || []).slice(0, 3);
      score.scores.midTerm = student.fortyFiveMinuteScore || null;
      score.scores.finalExam = student.finalScore || null;

      // Tính toán điểm trung bình
      const calculateAverageScore = () => {
        const { oral, fifteenMinutes, midTerm, finalExam } = score.scores;

        const oralScores = oral.filter(score => score !== null);
        const fifteenMinuteScores = fifteenMinutes.filter(score => score !== null);

        // Tổng điểm và tổng hệ số
        let totalScore = 0;
        let totalWeight = 0;

        // Tính tổng điểm và hệ số cho điểm miệng
        oralScores.forEach(score => {
          totalScore += score;
          totalWeight += 1;
        });

        // Tính tổng điểm và hệ số cho điểm 15 phút
        fifteenMinuteScores.forEach(score => {
          totalScore += score;
          totalWeight += 1;
        });

        // Tính điểm giữa kỳ với hệ số 2
        if (midTerm !== null) {
          totalScore += midTerm * 2;
          totalWeight += 2;
        }

        // Tính điểm cuối kỳ với hệ số 3
        if (finalExam !== null) {
          totalScore += finalExam * 3;
          totalWeight += 3;
        }

        // Trả về điểm trung bình
        return totalWeight > 0 ? totalScore / totalWeight : 0;
      };

      score.averageScore = calculateAverageScore();

      try {
        return await score.save();
      } catch (validationError) {
        console.error('Validation error for student:', student._id, validationError);
        return null;
      }
    });

    const savedScores = await Promise.all(scoreUpdates);
    const validSavedScores = savedScores.filter(score => score !== null);

    res.json({
      message: 'Scores saved successfully',
      savedCount: validSavedScores.length,
      totalCount: students.length
    });
  } catch (error) {
    console.error('Error in saveScores:', error);
    res.status(500).json({ message: 'Failed to save scores', error: error.message });
  }
};

exports.getScores = async (req, res) => {
  try {
    const { classId } = req.params;

    // Lấy thông tin lớp học để xác nhận lớp học tồn tại
    const classData = await Class.findById(classId).populate('students');
    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Lấy thông tin học sinh từ bảng User có role là Student
    const students = await User.find({ _id: { $in: classData.students }, role: 'Student' });
    if (!students.length) {
      return res.status(404).json({ message: 'No students found for this class' });
    }

    // Lấy thông tin điểm của các học sinh trong lớp học
    const scores = await Score.find({ classId }).populate('studentId');

    // Tạo một object chứa thông tin điểm của từng học sinh
    const studentScores = students.map(student => {
      const studentScore = scores.find(score => score.studentId.equals(student._id));
      return {
        studentId: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        scores: studentScore ? {
          oral: studentScore.scores.oral || [null, null, null],
          fifteenMinutes: studentScore.scores.fifteenMinutes || [null, null, null],
          midTerm: studentScore.scores.midTerm || null,
          finalExam: studentScore.scores.finalExam || null,
          averageScore: studentScore.averageScore || null
        } : {
          oral: [null, null, null],
          fifteenMinutes: [null, null, null],
          midTerm: null,
          finalExam: null,
          averageScore: null
        }
      };
    });

    res.json({ classId, students: studentScores });
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ message: 'Server error' });
  }
};