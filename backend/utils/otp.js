const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const otpStore = new Map();

exports.sendOTP = async (phone) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(phone, { code: otp, expiresAt: Date.now() + 10 * 60 * 1000 });
    await client.messages.create({
      body: `Your RideDGK verification code is: ${otp}. Valid for 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    return true;
  } catch (error) {
    console.error('OTP sending error:', error);
    throw error;
  }
};

exports.verifyOTP = async (phone, otp) => {
  try {
    const storedOTP = otpStore.get(phone);
    if (!storedOTP) return false;
    if (Date.now() > storedOTP.expiresAt) { otpStore.delete(phone); return false; }
    if (storedOTP.code !== otp) return false;
    otpStore.delete(phone);
    return true;
  } catch (error) {
    console.error('OTP verification error:', error);
    return false;
  }
};
