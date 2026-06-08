const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendOTP, verifyOTP } = require('../utils/otp');
const { protect } = require('../middleware/auth');

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password) return res.status(400).json({ error: 'Please provide all required fields' });
    let user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) return res.status(400).json({ error: 'User already exists' });
    user = await User.create({ name, email, phone, password, role: role || 'passenger' });
    await sendOTP(phone);
    res.status(201).json({ message: 'User registered successfully. OTP sent to phone.', userId: user._id, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ error: 'Phone and OTP required' });
    const isValid = await verifyOTP(phone, otp);
    if (!isValid) return res.status(400).json({ error: 'Invalid or expired OTP' });
    const user = await User.findOneAndUpdate({ phone }, { isPhoneVerified: true }, { new: true });
    const token = user.getSignedJWT();
    res.json({ message: 'Phone verified successfully', token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    const token = user.getSignedJWT();
    res.json({ message: 'Login successful', token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/resend-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'Phone required' });
    await sendOTP(phone);
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wallet.transactions');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
