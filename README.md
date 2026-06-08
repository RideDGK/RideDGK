# 🚗 RideDGK - Ride Sharing Application

A modern ride-sharing web application built with HTML, CSS, and JavaScript, featuring real-time notifications through Firebase Cloud Messaging.

## ✨ Features

- **User Roles**: Support for both drivers and administrators
- **Admin Dashboard**: Manage drivers, riders, and monitor system
- **Driver Portal**: Accept rides, track earnings, manage profile
- **Real-time Notifications**: Firebase Cloud Messaging integration
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📁 Project Structure

```
RideDGK/
├── index.html                 # Main application entry point
├── Driver.html               # Driver portal interface
├── Admin.html                # Admin dashboard
├── firebase-messaging-sw.js  # Service worker for push notifications
├── README.md                 # This file
├── .gitignore               # Git ignore rules
├── .env.example             # Environment variables template
└── docs/                    # Documentation
    ├── CONTRIBUTING.md
    └── SETUP.md
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend Services**: Firebase (Cloud Messaging)
- **Real-time Updates**: Firebase Cloud Messaging (FCM)
- **Version Control**: Git & GitHub

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase project with Cloud Messaging enabled
- Internet connection

### Installation

1. Clone the repository
```bash
git clone https://github.com/RideDGK/RideDGK.git
cd RideDGK
```

2. Set up environment variables
```bash
cp .env.example .env
```

3. Update your Firebase configuration in the HTML files with your project credentials

4. Open `index.html` in your web browser or deploy to a web server

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Cloud Messaging
3. Generate your service account credentials
4. Update your configuration in the application files

## 📖 Usage

- **For Users**: Navigate to the main application at `index.html`
- **For Drivers**: Access the driver portal at `Driver.html`
- **For Admins**: Access the dashboard at `Admin.html`

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines on:
- How to report bugs
- How to suggest enhancements
- How to submit pull requests

## 📝 License

This project is open source and available under the MIT License.

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation in the `docs/` folder

## 🔄 Recent Updates

- Integrated Firebase Cloud Messaging for real-time notifications
- Implemented admin dashboard
- Created dedicated driver portal

---

**Last Updated**: June 2026