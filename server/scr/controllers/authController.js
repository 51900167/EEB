const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const transporter = require("../../config/mail");
const Chat = require("../models/Chat");
const secret_jwt = process.env.SECRET_JWT;
const getCurrentSemester = require("../middlewares/getCurrentSemester.js");

exports.login = async (req, res) => {
  const { username, password, role } = req.body; // Thêm role vào body của yêu cầu

  try {
    // Tìm người dùng dựa trên Username và vai trò
    let user = await User.findOne({ username, role });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Lấy thông tin học kỳ hiện tại
    // const currentSemester = await getCurrentSemester();

    // Tạo JWT token và thêm role vào payload
    const payload = {
      user: {
        id: user.id,
        user: user.user,
        role: user.role, // Thêm role vào token payload
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_JWT, // Thay thế bằng secret key thực tế của bạn
      { expiresIn: "3d" }, // Tuổi thọ của token
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

exports.profile = async (req, res) => {
  try {
    const userId = req.params.id; // Lấy userId từ tham số URL
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Tìm người dùng dựa trên _id
    const profile = await User.findById(userId).select("-password"); // Loại bỏ mật khẩu khỏi kết quả

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    // Trả về thông tin profile người dùng
    res.json(profile);
    console.log("User profile: ", profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

let resetCodes = {}; // Sử dụng Redis hoặc cơ sở dữ liệu thực sự cho sản phẩm thực tế
exports.sendResetCode = async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findOne({ username, email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const resetCode = crypto.randomInt(100000, 999999).toString();
    resetCodes[email] = resetCode;

    const mailOptions = {
      from: "englishgoforschool@gmail.com",
      to: email,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${resetCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send("Failed to send reset code");
      }
      res.status(200).send("Reset code sent");
    });
  } catch (error) {
    console.error("Error in sendResetCode:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

// Xác thực mã xác thực
exports.verifyResetCode = (req, res) => {
  const { email, code } = req.body;
  if (resetCodes[email] && resetCodes[email] === code) {
    res.status(200).send("Code verified");
  } else {
    res.status(400).send("Invalid code");
  }
};

// Đặt lại mật khẩu
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  console.log("Received reset request:", { email, newPassword });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    console.log("Password reset successfully");
    res.status(200).send("Password reset successfully");
  } catch (error) {
    console.error("Error resetting password:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

// Fetch messages from MongoDB
exports.getMessage = async (req, res) => {
  const { page = 1, limit = 30 } = req.query;

  try {
    const messages = await Chat.find({ room: "common" })
      .sort({ timestamp: -1 }) // Sắp xếp giảm dần theo thời gian
      .skip((page - 1) * limit) // Bỏ qua các bản ghi của trang trước
      .limit(parseInt(limit)) // Giới hạn số bản ghi theo limit
      .populate("sender", "firstName lastName role avatar"); // Populate sender với firstName, lastName, role, và avatar

    res.status(200).json(messages.reverse()); // Đảo ngược mảng để có thứ tự thời gian tăng dần
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.postMessage = async (req, res) => {
  try {
    const { sender, message } = req.body;

    if (!sender || !message) {
      return res
        .status(400)
        .json({ message: "Sender and message are required." });
    }

    const senderUser = await User.findById(sender);
    if (!senderUser) {
      return res.status(404).json({ message: "Sender not found." });
    }

    const newMessage = new Chat({
      room: "common",
      sender: {
        _id: sender,
        firstName: senderUser.firstName,
        lastName: senderUser.lastName,
        role: senderUser.role,
        avatar: senderUser.avatar,
      },
      message,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: error.message });
  }
};
