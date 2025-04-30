const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Tải file JSON từ Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
