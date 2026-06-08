const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  code: { type: String, required: true },
  attempts: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: 600 }
});

module.exports = mongoose.model('OTP', OTPSchema);
