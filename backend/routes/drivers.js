const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');
const User = require('../models/User');
const { protect, isDriver } = require('../middleware/auth');

router.post('/apply', protect, async (req, res) => {
  try {
    const { licenseNumber, licenseExpiry, cnic, vehicle } = req.body;
    if (!licenseNumber || !licenseExpiry || !cnic || !vehicle) return res.status(400).json({ error: 'All fields required' });
    let driver = await Driver.findOne({ userId: req.user._id });
    if (driver) return res.status(400).json({ error: 'You are already registered as a driver' });
    driver = await Driver.create({ userId: req.user._id, licenseNumber, licenseExpiry: new Date(licenseExpiry), cnic, vehicle });
    res.status(201).json({ message: 'Driver application submitted', driver });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/profile', protect, isDriver, async (req, res) => {
  try {
    const driver = await Driver.findOne({ userId: req.user._id }).populate('userId');
    res.json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/location/update', protect, isDriver, async (req, res) => {
  try {
    const { latitude, longitude, isOnline } = req.body;
    const driver = await Driver.findOneAndUpdate({ userId: req.user._id }, { 'currentLocation.coordinates': [longitude, latitude], isOnline: isOnline !== undefined ? isOnline : true }, { new: true });
    res.json({ message: 'Location updated', driver });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/earnings', protect, isDriver, async (req, res) => {
  try {
    const driver = await Driver.findOne({ userId: req.user._id });
    res.json({ totalEarnings: driver.totalEarnings, completedRides: driver.completedRides, rating: driver.rating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
