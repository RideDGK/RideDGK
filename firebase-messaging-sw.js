importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD6NgezMei1zau__3--G89I8doSAtiJdO8",
  authDomain: "ridedgk-70041.firebaseapp.com",
  projectId: "ridedgk-70041",
  storageBucket: "ridedgk-70041.firebasestorage.app",
  messagingSenderId: "1030497478997",
  appId: "1:1030497478997:web:b6344c5e10ef70396ca7dc",
  databaseURL: "https://ridedgk-70041-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Background message:', payload);
  const title = payload.notification?.title || 'RideDGK';
  const options = {
    body: payload.notification?.body || 'Nayi notification',
    icon: '/icon.png',
    badge: '/icon.png',
    data: payload.data
  };
  return self.registration.showNotification(title, options);
});
