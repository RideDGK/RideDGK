# Setup Guide for RideDGK

This guide will help you set up the RideDGK application for development and deployment.

## Prerequisites

- Git
- Node.js (v14 or higher) - optional, for development server
- Modern web browser
- Firebase account (free tier available)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/RideDGK/RideDGK.git
cd RideDGK
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your Firebase configuration:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

### 3. Firebase Setup

#### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Enter project name: "RideDGK"
4. Continue through the setup wizard
5. Enable Cloud Messaging

#### Get Your Credentials

1. In Firebase Console, go to Project Settings (gear icon)
2. Copy your configuration
3. Paste into `.env` file

#### Enable Cloud Messaging

1. Go to "Messaging" in Firebase console
2. Follow the setup wizard
3. Download your service account key

### 4. Run Locally

#### Option A: Using Python (Simple HTTP Server)

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

#### Option B: Using Node.js

```bash
# Install a simple server
npm install -g http-server

# Run the server
http-server -p 8000
```

#### Option C: Using Live Server Extension

Install the "Live Server" extension in your code editor and use "Open with Live Server".

### 5. Test the Application

1. **User Portal**: Visit `http://localhost:8000/index.html`
2. **Driver Portal**: Visit `http://localhost:8000/Driver.html`
3. **Admin Dashboard**: Visit `http://localhost:8000/Admin.html`

## Deployment

### Deploy to GitHub Pages

1. In your repository settings, go to "Pages"
2. Select source: Deploy from a branch
3. Select branch: `main`
4. Save

Your site will be available at: `https://ridedgk.github.io/RideDGK/`

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase hosting
firebase init hosting

# Deploy
firebase deploy
```

### Deploy to Netlify

1. Push your code to GitHub
2. Connect repository to Netlify
3. Build command: Leave empty
4. Publish directory: `/`
5. Deploy

## Troubleshooting

### Firebase Not Connecting

- ✅ Check if `.env` file exists and has correct values
- ✅ Verify Cloud Messaging is enabled in Firebase
- ✅ Check browser console for errors (F12)
- ✅ Ensure you're using HTTPS (required for push notifications)

### Service Worker Issues

- ✅ Verify `firebase-messaging-sw.js` is in root directory
- ✅ Check browser's Application tab for registered service workers
- ✅ Clear cache: Ctrl+Shift+Delete or Cmd+Shift+Delete

### Notifications Not Working

- ✅ Allow notifications when browser asks
- ✅ Check if service worker is registered
- ✅ Verify Firebase configuration
- ✅ Check browser notification permissions in settings

### CORS Errors

- ✅ Use HTTPS (localhost is exception)
- ✅ Deploy to a proper domain
- ✅ Check Firebase CORS settings

## Development Tips

### Useful Chrome DevTools Shortcuts

- **F12**: Open Developer Tools
- **Ctrl+Shift+C**: Inspect Element
- **Ctrl+Shift+J**: Open Console
- **Application Tab**: View Service Workers and Storage

### Testing Notifications

1. Open browser console
2. Register service worker manually
3. Send test message from Firebase Console
4. Monitor console logs

### Debugging Firebase

Add to your HTML files:

```javascript
// Enable Firebase debug mode
localStorage.setItem('debug', '*');
```

## Next Steps

1. Read [CONTRIBUTING.md](CONTRIBUTING.md) to understand how to contribute
2. Review the existing code in `index.html`, `Driver.html`, `Admin.html`
3. Start implementing features or fixing bugs
4. Create a pull request

## Support

For issues during setup:
- Check browser console for error messages
- Review Firebase documentation
- Open an issue on GitHub with error details

---

Happy coding! 🚀