// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const Chat = require('../models/Chat');
const User = require('../models/User')

router.get('/profile/:id', authController.profile);
router.route('/forgot-password').post(authController.sendResetCode);
router.route('/verify-reset-code').post(authController.verifyResetCode);
router.route('/reset-password').post(authController.resetPassword);


router.get('/messages', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const messages = await Chat.find({ room: 'common' })
            .sort({ timestamp: 1 })
            .populate('sender', 'firstName lastName role')
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalMessages = await Chat.countDocuments({ room: 'common' });

        res.status(200).json({
            messages,
            totalPages: Math.ceil(totalMessages / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: error.message });
    }
});



// Endpoint để gửi tin nhắn

router.post('/message', async (req, res) => {
  try {
      const { sender, message } = req.body;

      if (!sender || !message) {
          return res.status(400).json({ message: 'Sender and message are required.' });
      }

      const newMessage = new Chat({
          room: 'common',  // Hoặc sử dụng giá trị khác nếu cần
          sender,
          message
      });

      await newMessage.save();
      res.status(201).json(newMessage);
  } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ message: error.message });
  }
});


module.exports = router;