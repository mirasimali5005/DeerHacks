import React, { useState, useEffect } from "react";
import { Moon, Sun, User } from "lucide-react";
import "./Dashboard.css";

function Dashboard() {
  // --- THEME STATE ---
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
          <p>Mini-Map or Main Content Here</p>
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
