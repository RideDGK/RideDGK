# RideDGK Backend API

Production-ready backend for RideDGK taxi sharing application.

## 🚀 Features

✅ User Authentication (Email/Password + Phone OTP)
✅ Driver Verification System
✅ Real-time Ride Matching
✅ GPS Tracking & Location Services
✅ Stripe Payment Integration
✅ Wallet System
✅ Admin Dashboard
✅ Socket.io Real-time Updates
✅ Revenue Analytics
✅ Support Ticketing

## 📋 Prerequisites

- Node.js (v14+)
- MongoDB (v4.4+)
- Twilio Account (for OTP)
- Stripe Account (for payments)

## 🔧 Installation

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## 📚 API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/verify-otp
- POST /api/auth/resend-otp
- GET /api/auth/me

### Users
- GET /api/users/profile
- PUT /api/users/profile
- POST /api/users/change-password

### Rides
- POST /api/rides/request
- POST /api/rides/{id}/accept
- POST /api/rides/{id}/start
- POST /api/rides/{id}/complete
- POST /api/rides/{id}/cancel
- GET /api/rides/history

### Drivers
- POST /api/drivers/apply
- GET /api/drivers/profile
- POST /api/drivers/location/update
- GET /api/drivers/earnings

### Payments
- POST /api/payments/create-intent
- POST /api/payments/confirm
- GET /api/payments/history

### Admin
- GET /api/admin/dashboard
- GET /api/admin/drivers
- POST /api/admin/drivers/{id}/approve
- GET /api/admin/analytics/revenue

## 🔄 Socket.io Events

- driver-location
- ride-update
- chat-message
- driver-update
- ride-status

## 🔐 Security

- JWT Authentication
- Password Hashing (bcrypt)
- Rate Limiting
- CORS Protection
- Helmet.js Headers

---

Last Updated: June 2026
