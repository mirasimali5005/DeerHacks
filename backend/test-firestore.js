const db = require("./firebaseConfig");

async function testFirestore() {
  try {
    console.log("Testing Firestore connection...");
    const docRef = await db.collection("test").add({
      message: "This is a test",
      timestamp: new Date()
    });
    console.log("Test document written with ID:", docRef.id);
  } catch (error) {
    console.error("Error testing Firestore:", error);
  }
}

testFirestore();