const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ error: 'Not authorized to access this route' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(404).json({ error: 'User not found' });
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized to access this route' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: `User role '${req.user.role}' is not authorized` });
    }
    next();
  };
};

exports.isDriver = async (req, res, next) => {
  const Driver = require('../models/Driver');
  const driver = await Driver.findOne({ userId: req.user._id });
  if (!driver) return res.status(403).json({ error: 'You are not registered as a driver' });
  if (driver.verificationStatus !== 'approved') {
    return res.status(403).json({ error: 'Your driver account is not verified' });
  }
  req.driver = driver;
  next();
};
