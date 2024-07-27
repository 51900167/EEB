const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret_jwt = process.env.SECRET_JWT;

exports.register = async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    // Kiểm tra xem người dùng đã tồn tại hay chưa
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Tạo muối cho mật khẩu
    const salt = await bcrypt.genSalt(10);

    // Mã hóa mật khẩu sử dụng bcrypt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo một đối tượng người dùng mới với mật khẩu đã mã hóa
    user = new User({
      username,
      password: hashedPassword, // Sử dụng hashedPassword thay vì password
      email,
      role,
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await user.save();

    
  } catch (error) {
    console.error("Registration error:", error.message);
    if (error.name === "MongoError" && error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: "User with that email already exists" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kiểm tra xem người dùng tồn tại
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Tạo JWT token

    const payload = {
      user: {
        id: user.id,
        // Add additional fields here
        name: user.name, // Example: Add user name
        role: user.role, // Example: Add user role
      },
    };
    jwt.sign(
      payload,
      secret_jwt, // Thay thế bằng secret key thực tế của bạn
      { expiresIn: "6h" }, // Tuổi thọ của token
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Trả về token cho client
      }
    );
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).send("Server error");
  }
};

exports.logined = (req, res) => {
  res.send("STUDENT PAGE");
};
