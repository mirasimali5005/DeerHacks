const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

console.log("1. Starting Firebase debugging script...");
console.log("2. Service account project ID:", serviceAccount.project_id);

try {
  console.log("3. Attempting to initialize Firebase...");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("4. Firebase initialization appeared successful");
} catch (error) {
  console.error("ERROR DURING FIREBASE INIT:", error);
  process.exit(1);
}

const db = admin.firestore();
console.log("5. Created Firestore instance");

async function testFirestore() {
  console.log("6. Starting Firestore test function...");
  
  try {
    console.log("7. Creating test document...");
    const docRef = await db.collection("test").add({
      message: "Test at " + new Date().toISOString(),
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log("8. ✅ Document written with ID:", docRef.id);
    console.log("9. Test completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("ERROR DURING FIRESTORE WRITE:", error);
    process.exit(1);
  }
}

console.log("10. Calling test function...");
testFirestore().catch(err => {
  console.error("UNHANDLED ERROR IN TEST:", err);
  process.exit(1);
});

// Add a timeout in case it hangs
setTimeout(() => {
  console.error("TIMEOUT: Script did not complete in 15 seconds");
  process.exit(1);
}, 15000);