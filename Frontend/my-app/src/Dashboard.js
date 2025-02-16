// dashboard.js
import React, { useState, useEffect } from "react";
import { Moon, Sun, User } from "lucide-react";
import LiveLocationMap from "./LiveLocationMap"; // Import here
import "./Dashboard.css";

function Dashboard() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const currentTheme = isDark ? "dark" : "light";

  return (
    <div className={`theme-container ${currentTheme}`}>
      <div className="main-dashboard-container">
        {/* Top-Left AR / Message Button */}
        <div className="top-left">
          <button className="message-button">Message</button>
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

        {/* Add To AR Button */}
        <button className="add-to-ar-button">Add to AR</button>

        {/* Message Bar */}
        <div className="message-bar-container">
          <input className="message-bar" type="text" placeholder="Type a message..." />
          <button className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
