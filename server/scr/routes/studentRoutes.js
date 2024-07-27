// studentRoutes.js
const express = require('express');
const router = express.Router();
const studentControllers = require('../controllers/studentControllers');
const authMiddleware = require("../middlewares/authMiddleware");
const authController = require("../controllers/authController.js")

// router.route("/login").post(studentControllers.login);
router.route("/login").post(authController.login);
// router.route("/users", authMiddleware.authenticateJWT).get(studentControllers.users);



// router.route('/register')
  // .post(studentControllers.register)

  
module.exports = router;
