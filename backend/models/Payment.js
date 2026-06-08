const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  transactionId: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cash', 'card', 'wallet', 'jazzcash', 'easypaisa'], required: true },
  paymentGateway: { type: String, enum: ['stripe', 'jazzcash', 'easypaisa', 'local'], default: 'local' },
  stripePaymentIntentId: String,
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  description: String,
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

PaymentSchema.pre('save', async function(next) {
  if (!this.transactionId) {
    this.transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

module.exports = mongoose.model('Payment', PaymentSchema);
