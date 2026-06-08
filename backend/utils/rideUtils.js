const Driver = require('../models/Driver');

exports.findNearbyDrivers = async (latitude, longitude, radiusKm, vehicleType) => {
  try {
    const drivers = await Driver.find({
      'currentLocation': { $near: { $geometry: { type: 'Point', coordinates: [longitude, latitude] }, $maxDistance: radiusKm * 1000 } },
      isOnline: true,
      verificationStatus: 'approved',
      currentRideId: null,
      'vehicle.type': vehicleType
    }).limit(10);
    return drivers;
  } catch (error) {
    console.error('Error finding nearby drivers:', error);
    return [];
  }
};

exports.calculateFare = (distance, vehicleType) => {
  const baseFare = parseInt(process.env.BASE_FARE) || 50;
  const perKmRate = parseInt(process.env.PER_KM_RATE) || 10;
  const vehicleMultipliers = { 'car': 1.5, 'bike': 0.7, 'rickshaw': 1.0, 'chingchi': 0.8 };
  const multiplier = vehicleMultipliers[vehicleType] || 1;
  const distanceFare = Math.ceil(distance * perKmRate * multiplier);
  const totalFare = baseFare + distanceFare;
  return { baseFare, distanceFare, totalFare, distance: distance.toFixed(2), currency: 'PKR' };
};
