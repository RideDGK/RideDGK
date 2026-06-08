const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');
const Driver = require('../models/Driver');
const User = require('../models/User');
const { protect, isDriver } = require('../middleware/auth');
const { findNearbyDrivers, calculateFare } = require('../utils/rideUtils');

router.post('/request', protect, async (req, res) => {
  try {
    const { pickup, dropoff, vehicleType } = req.body;
    if (!pickup || !dropoff || !vehicleType) return res.status(400).json({ error: 'Pickup, dropoff, and vehicle type required' });
    const distance = Math.sqrt(Math.pow(dropoff.latitude - pickup.latitude, 2) + Math.pow(dropoff.longitude - pickup.longitude, 2)) * 111;
    const fare = calculateFare(distance, vehicleType);
    const ride = await Ride.create({ passengerId: req.user._id, pickup, dropoff, vehicleType, fare, distance });
    res.status(201).json({ message: 'Ride requested successfully', ride });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:rideId/accept', protect, isDriver, async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(req.params.rideId, { driverId: req.driver._id, status: 'accepted', acceptedAt: new Date() }, { new: true });
    if (!ride) return res.status(404).json({ error: 'Ride not found' });
    res.json({ message: 'Ride accepted', ride });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:rideId/start', protect, isDriver, async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(req.params.rideId, { status: 'started', startedAt: new Date() }, { new: true });
    res.json({ message: 'Ride started', ride });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:rideId/complete', protect, isDriver, async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(req.params.rideId, { status: 'completed', completedAt: new Date() }, { new: true });
    await Driver.findByIdAndUpdate(req.driver._id, { $inc: { totalEarnings: ride.fare.totalFare, completedRides: 1 } });
    await User.findByIdAndUpdate(ride.passengerId, { $inc: { totalRides: 1 } });
    res.json({ message: 'Ride completed', ride });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:rideId/cancel', protect, async (req, res) => {
  try {
    const { reason } = req.body;
    const ride = await Ride.findById(req.params.rideId);
    if (!ride) return res.status(404).json({ error: 'Ride not found' });
    const updatedRide = await Ride.findByIdAndUpdate(req.params.rideId, { status: 'cancelled' }, { new: true });
    res.json({ message: 'Ride cancelled', ride: updatedRide });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/history', protect, async (req, res) => {
  try {
    const rides = await Ride.find({ $or: [{ passengerId: req.user._id }] }).sort({ createdAt: -1 }).limit(50);
    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
