// const admin = require("firebase-admin"); // this loades the firebase admin sdk which lets us talk to firestore(database)
// const serviceAccount = require("./serviceAccountKey.json"); // Firebase credentials // loads our fire base private key this key authenticates
// // our backend with firebase

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount), // this tells firebase to use OUR key
// }); // this is basically starting the firebase using the secret key 

// const db = admin.firestore(); // connects to firestore(database we created above)
// // now we can store and retrieve messages from db which is our database

// module.exports = db; // this makes db availaible to other files 
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

console.log("Initializing Firebase...");
try {
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