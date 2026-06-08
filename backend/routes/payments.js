const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');
const { protect } = require('../middleware/auth');

router.post('/create-intent', protect, async (req, res) => {
  try {
    const { rideId, amount } = req.body;
    if (!rideId || !amount) return res.status(400).json({ error: 'Ride ID and amount required' });
    const paymentIntent = await stripe.paymentIntents.create({ amount: Math.round(amount * 100), currency: 'pkr', metadata: { rideId, userId: req.user._id.toString() } });
    res.json({ clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/confirm', protect, async (req, res) => {
  try {
    const { rideId, amount } = req.body;
    const payment = await Payment.create({ userId: req.user._id, rideId, amount, paymentMethod: 'card', status: 'completed' });
    res.json({ message: 'Payment successful', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/history', protect, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(50);
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
