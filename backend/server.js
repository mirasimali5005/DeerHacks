const PROXIMITY = 10000000000000000000000000000000000000000000;
// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./firebaseConfig"); // The Firestore instance we just exported

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simple test endpoint
app.get("/test", (req, res) => {
  res.send("Server is up and running!");
});


app.post("/addMessage", async (req, res) => {
  try {
    const { user, text, lat, lng, private } = req.body;

    if (!user || !text || lat === undefined || lng === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const docRef = await db.collection("messages").add({
      user,
      text,
      lat,
      lng,
      private: !!private,
      timestamp: new Date()
    });

    // Send a success response
    return res.status(200).json({
      success: true,
      message: "Message added successfully!",
      id: docRef.id
    });
  } catch (error) {
    console.error("Error adding message:", error);
    return res.status(500).json({
      error: error.message || "Unknown error occurred"
    });
  }
});


app.get("/getNearbyMessages", async (req, res) => {
    try {
        const { lat, lng } = req.query;
    
        if (!lat || !lng) {
            return res.status(400).json({ error: "Missing lat or lng parameters" });
        }
    
        console.log("Getting nearby messages for lat:", lat, "lng:", lng);
        const snapshot = await db.collection("messages").get();
    
        const messages = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            const distance = haversineDistance(parseFloat(lat), parseFloat(lng), data.lat, data.lng);
            if (distance < PROXIMITY) {
                messages.push({
                    id: doc.id,
                    user: data.user,
                    text: data.text,
                    lat: data.lat,
                    lng: data.lng,
                    private: data.private,
                    timestamp: data.timestamp ? new Date(data.timestamp._seconds * 1000).toISOString() : null
                });
            }
        });

        console.log(`Found ${messages.length} nearby messages`);
        return res.json(messages);
    
    } catch (error) {
        console.error("Error fetching nearby messages:", error);
        return res.status(500).json({ error: error.message || "Unknown error occurred" });
    }
});

  
// Haversine distance calculation
const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371e3; // Earth's radius in meters
    const φ1 = toRad(lat1), φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1), Δλ = toRad(lon2 - lon1);
  
    const a = Math.sin(Δφ / 2) ** 2 + 
             Math.cos(φ1) * Math.cos(φ2) * 
             Math.sin(Δλ / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };


const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.error("Server error:", error);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection at:", promise, "reason:", reason);
});
