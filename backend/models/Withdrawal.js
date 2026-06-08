const mongoose = require('mongoose');

const WithdrawalSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  amount: { type: Number, required: true },
  bankAccount: { accountNumber: String, accountTitle: String, bankName: String },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
  transactionId: String,
  failureReason: String,
  processedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Withdrawal', WithdrawalSchema);
