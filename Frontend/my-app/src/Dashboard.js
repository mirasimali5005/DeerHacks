// import React, { useState, useEffect } from "react";
// import { Moon, Sun, Settings, User } from "lucide-react";
// import "./Dashboard.css";

// function Dashboard() {
//   // --- THEME STATE ---
//   const [isDark, setIsDark] = useState(() => {
//     const savedTheme = localStorage.getItem("theme");
//     return savedTheme ? JSON.parse(savedTheme) : true;
//   });

//   useEffect(() => {
//     localStorage.setItem("theme", JSON.stringify(isDark));
//   }, [isDark]);

//   const toggleTheme = () => {
//     setIsDark((prev) => !prev);
//   };

//   const currentTheme = isDark ? "dark" : "light";

//   return (
//     <div className={`theme-container ${currentTheme}`}>
//       <div className="main-dashboard-container">
//         {/* ========== TOP-LEFT: AR BUTTON ========== */}
//         <div className="top-left">
//           <button className="message-button">Message</button>
//         </div>

//         {/* ========== TOP-RIGHT: PROFILE, SETTINGS, THEME TOGGLE ========== */}
//         <div className="top-right">
//           <User size={24} className="icon" title="Profile" />
//           <Settings size={24} className="icon" title="Settings" />
//           <button onClick={toggleTheme} className={`theme-toggle ${currentTheme}`}>
//             {isDark ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//         </div>

//         {/* ========== MINI-MAP / MAIN CONTENT ========== */}
//         <div className="mini-map">
//           <p>Mini-Map or Main Content Here</p>
//         </div>

//         {/* ========== ADD TO AR BUTTON BELOW MINI-MAP ========== */}
//         <button className="add-to-ar-button">Add to AR</button>

//         {/* ========== MESSAGE BAR (BOTTOM) ========== */}
//         <div className="message-bar-container">
//           <input className="message-bar" type="text" placeholder="Type a message..." />
//           <button className="send-button">Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


import React, { useState, useEffect } from "react";
import { Moon, Sun, User } from "lucide-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./Dashboard.css";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 43.6535,
  lng: -79.3835,
};

function Dashboard() {
  // --- THEME STATE ---
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  // Optional: State to store markers (e.g., nearby messages)
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDark));
  }, [isDark]);

  // Optional: Fetch nearby messages to display as markers
  useEffect(() => {
    fetch(`https://firebase-backend-a2m7.onrender.com/getNearbyMessages?lat=${center.lat}&lng=${center.lng}`)
      .then((res) => res.json())
      .then((data) => {
        // Assume data is an array of messages with "lat" and "lng"
        setMarkers(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const currentTheme = isDark ? "dark" : "light";

  return (
    <div className={`theme-container ${currentTheme}`}>
      <div className="main-dashboard-container">
        {/* ========== TOP-LEFT: AR BUTTON ========== */}
        <div className="top-left">
          <button className="message-button">Message</button>
        </div>

        {/* ========== TOP-RIGHT: PROFILE & THEME TOGGLE ========== */}
        <div className="top-right">
          <User size={24} className="icon" title="Profile" />
          <button onClick={toggleTheme} className={`theme-toggle ${currentTheme}`}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* ========== MINI-MAP / MAIN CONTENT ========== */}
        <div className="mini-map">
          <LoadScript googleMapsApiKey="AIzaSyBDzpNk4DWSJjuKcyTEA_8eErVIdMtF0nU">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
              {/* Render markers if any */}
              {markers.map((marker, index) => (
                <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>

        {/* ========== ADD TO AR BUTTON BELOW MINI-MAP ========== */}
        <button className="add-to-ar-button">Add to AR</button>

        {/* ========== MESSAGE BAR (BOTTOM) ========== */}
        <div className="message-bar-container">
          <input className="message-bar" type="text" placeholder="Type a message..." />
          <button className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
