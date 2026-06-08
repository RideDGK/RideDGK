const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  licenseNumber: {
    type: String,
    required: [true, 'License number required'],
    unique: true
  },
  licenseExpiry: {
    type: Date,
    required: true
  },
  licenseDocument: String,
  cnic: {
    type: String,
    required: true,
    unique: true
  },
  cnicDocument: String,
  vehicleRegistration: {
    type: String,
    required: true,
    unique: true
  },
  vehicle: {
    type: {
      type: String,
      enum: ['car', 'bike', 'rickshaw', 'chingchi'],
      required: true
    },
    make: String,
    model: String,
    year: Number,
    color: String,
    registrationNumber: String
  },
  bankAccount: {
    accountNumber: String,
    accountTitle: String,
    bankName: String,
    balance: { type: Number, default: 0 }
  },
  documents: [{
    type: { type: String, enum: ['license', 'vehicle_registration', 'insurance', 'cnic'] },
    url: String,
    expiryDate: Date,
    verificationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
  }],
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending'
  },
  isOnline: { type: Boolean, default: false },
  currentLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  currentRideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', default: null },
  completedRides: { type: Number, default: 0 },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  totalEarnings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true, index: { 'currentLocation': '2dsphere' } });

DriverSchema.index({ 'currentLocation': '2dsphere' });
module.exports = mongoose.model('Driver', DriverSchema);
