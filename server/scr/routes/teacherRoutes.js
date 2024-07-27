const express = require('express');
const router = express.Router();
const teacherControllers =  require("../controllers/teacherControllers.js");
const authMiddleware = require("../middlewares/authMiddleware");
const authController = require("../controllers/authController.js")

//Phung
const Exam = require("../models/Exam");
const Score = require("../models/Score");



// router.route("/login").post(teacherControllers.login);
router.route("/login").post(authController.login);
router.route("/users", authMiddleware.authenticateJWT).get(teacherControllers.users);

router.route("/semesters").get(teacherControllers.getSemesters);
router.route("/classes").get(teacherControllers.getClasses);



//Phung
router.post("/create", async (req, res) => {
  console.log(req.body);

  const data = new Exam(req.body);
  await data.save();

  res.send({ success: true, message: "data save successfully!", data: data });
});

// update data
router.put("/update", async (req, res) => {
  /* console.log(req.body); */
  
  const { _id, ...rest } = req.body;
  const dataUpdate = await ExamModel.updateOne({ _id: _id }, rest);
  

  res.send({
    success: true,
    message: "data update successfully!",
    dataUpdate: dataUpdate,
  });
});

// delete data
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const dataDelete = await ExamModel.deleteOne({ _id: id });

  console.log(id);
  res.send({
    success: true,
    message: "data delete successfully!",
    dataDelete: dataDelete,
  });
});



router.get('/', async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get exam by ID
router.get('/exam/:id', getExam, (req, res) => {
  res.json(res.exam);
});

// Middleware to get exam by ID
async function getExam(req, res, next) {
  let exam;
  try {
    exam = await Exam.findById(req.params.id);
    if (exam == null) {
      return res.status(404).json({ message: 'Cannot find exam' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.exam = exam;
  next();
}



/////////////////////////////// Nhập điểm
// router.get('/scores', getScoresByClass);
router.route("/getclasses/:teacherId").get(teacherControllers.getclasses);
router.route("/getscores/:classId").get(teacherControllers.getScores);
// router.('//:', );


router.route("/getclassdetails/:classId").get(teacherControllers.getClassesById);
router.route("/savescore/:classId").post(teacherControllers.saveScores);
// router.route("/getscore/:classId").post(teacherControllers.getScore);
// router.route("/classes").get(teacherControllers.getClasses);


router.get('/class/:classId', async (req, res) => {
  try {
    const scores = await Score.find({ classId: req.params.classId });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cập nhật điểm số
router.put('/update/:id', async (req, res) => {
  try {
    const score = await Score.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(score);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
