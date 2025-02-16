require("dotenv").config();
const admin = require("firebase-admin");
console.log("Initializing Firebase...");
try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
  process.exit(1);
}

const db = admin.firestore();
console.log("Firestore instance created");

module.exports = db;
