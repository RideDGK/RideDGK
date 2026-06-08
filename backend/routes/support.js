const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/ticket', protect, async (req, res) => {
  try {
    const { subject, description, category } = req.body;
    if (!subject || !description || !category) return res.status(400).json({ error: 'Subject, description, and category required' });
    const ticket = { ticketId: `TICKET${Date.now()}`, subject, description, category, status: 'open', createdAt: new Date() };
    res.status(201).json({ message: 'Support ticket created', ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
