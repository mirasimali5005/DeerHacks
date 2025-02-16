// // dashboard.js
// import React, { useState, useEffect } from "react";
// import { Moon, Sun, User } from "lucide-react";
// import LiveLocationMap from "./LiveLocationMap"; // Import here
// import "./Dashboard.css";

// function Dashboard() {
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
//         {/* Top-Left AR / Message Button */}
//         <div className="top-left">
//           <button className="message-button">Message</button>
//         </div>

//         {/* Top-Right Profile & Theme Toggle */}
//         <div className="top-right">
//           <User size={24} className="icon" title="Profile" />
//           <button onClick={toggleTheme} className={`theme-toggle ${currentTheme}`}>
//             {isDark ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//         </div>

//         {/* Replace Mini Map with Live Location Map */}
//         <div className="mini-map">
//           <LiveLocationMap />
//         </div>

//         {/* Add To AR Button */}
//         <button className="add-to-ar-button">Add to AR</button>

//         {/* Message Bar */}
//         <div className="message-bar-container">
//           <input className="message-bar" type="text" placeholder="Type a message..." />
//           <button className="send-button">Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Moon, Sun, User, MessageCircle } from "lucide-react";
import LiveLocationMap from "./LiveLocationMap";
import ARModal from "./ARModal"; // Assuming this is a modal component
import "./Dashboard.css";

function Dashboard() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  const [isAROpen, setIsAROpen] = useState(false);
  const [showARButton, setShowARButton] = useState(true);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleARClick = () => {
    setIsAROpen(true);
    setShowARButton(false);
  };

  const handleMessageClick = () => {
    setIsMessageOpen(true);
    setMessage("Hello"); // Display "Hello" when clicked
  };

  const handleCloseMessage = () => {
    setIsMessageOpen(false);
  };

  const currentTheme = isDark ? "dark" : "light";

  return (
    <div className={`theme-container ${currentTheme}`}>
      <div className="main-dashboard-container">
        {/* Top-Left Add to AR Button */}
        <div className="top-left">
          {showARButton && (
            <button className="ar-button" onClick={handleARClick}>
              Add to AR
            </button>
          )}
        </div>

        {/* Top-Right Profile & Theme Toggle */}
        <div className="top-right">
          <User size={24} className="icon" title="Profile" />
          <button onClick={toggleTheme} className={`theme-toggle ${currentTheme}`}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Replace Mini Map with Live Location Map */}
        <div className="mini-map">
          <LiveLocationMap />
        </div>

        {/* Messages Button */}
        <button className="messages-button" onClick={handleMessageClick} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <MessageCircle size={12.5} /> <span>Messages</span>
        </button>

        {/* Message Bar */}
        <div className="message-bar-container">
          <input className="message-bar" type="text" placeholder="Type a message..." />
          <button className="send-button">Send</button>
        </div>

        {/* AR Modal */}
        <ARModal
          isOpen={isAROpen}
          onClose={() => {
            setIsAROpen(false);
            setShowARButton(true);
          }}
        />

        {/* Message Modal for AR-Sender */}
        {isMessageOpen && (
          <div className="message-modal">
            <div className="message-modal-content">
              <button className="close-modal" onClick={handleCloseMessage}>✖</button>
              <iframe
                src="ar-sender.html"
                width="100%"
                height="500px"
                title="AR Messages"
              ></iframe>
              <p style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>{message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

