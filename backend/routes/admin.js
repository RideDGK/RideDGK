const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Driver = require('../models/Driver');
const Ride = require('../models/Ride');
const Payment = require('../models/Payment');

router.get('/dashboard', protect, authorize('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'passenger' });
    const totalDrivers = await Driver.countDocuments();
    const approvedDrivers = await Driver.countDocuments({ verificationStatus: 'approved' });
    const totalRides = await Ride.countDocuments();
    const completedRides = await Ride.countDocuments({ status: 'completed' });
    const revenues = await Payment.aggregate([{ $match: { status: 'completed' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]);
    res.json({ totalUsers, totalDrivers, approvedDrivers, totalRides, completedRides, totalRevenue: revenues[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/drivers', protect, authorize('admin'), async (req, res) => {
  try {
    const drivers = await Driver.find().populate('userId', 'name email phone rating').sort({ createdAt: -1 });
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/drivers/:driverId/approve', protect, authorize('admin'), async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.driverId, { verificationStatus: 'approved' }, { new: true });
    await User.findByIdAndUpdate(driver.userId, { role: 'driver' });
    res.json({ message: 'Driver approved', driver });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/analytics/revenue', protect, authorize('admin'), async (req, res) => {
  try {
    const monthlyRevenue = await Payment.aggregate([{ $match: { status: 'completed' } }, { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, total: { $sum: '$amount' } } }, { $sort: { _id: 1 } }]);
    res.json({ monthlyRevenue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
