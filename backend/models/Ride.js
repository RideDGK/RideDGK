const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  rideNumber: { type: String, unique: true, sparse: true },
  passengerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null },
  pickup: {
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  dropoff: {
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  vehicleType: { type: String, enum: ['car', 'bike', 'rickshaw', 'chingchi'], required: true },
  status: { type: String, enum: ['requested', 'accepted', 'arrived', 'started', 'completed', 'cancelled'], default: 'requested' },
  fare: { baseFare: Number, distanceFare: Number, surgeFare: Number, totalFare: { type: Number, required: true }, discount: { type: Number, default: 0 } },
  distance: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  paymentMethod: { type: String, enum: ['cash', 'card', 'wallet', 'jazzcash', 'easypaisa'], default: 'cash' },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  route: [{ latitude: Number, longitude: Number, timestamp: Date }],
  requestedAt: { type: Date, default: Date.now },
  acceptedAt: Date,
  startedAt: Date,
  completedAt: Date
}, { timestamps: true });

RideSchema.pre('save', async function(next) {
  if (!this.rideNumber) {
    const count = await mongoose.model('Ride').countDocuments();
    this.rideNumber = `RDE${Date.now()}${count}`;
  }
  next();
});

module.exports = mongoose.model('Ride', RideSchema);
