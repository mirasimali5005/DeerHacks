import React, { useState, useEffect, useRef } from "react";
/* Import needed icons from lucide-react */
import {
  Moon,
  Sun,
  FileText,
  Image as ImageIcon,
  Video as VideoIcon,
  Settings,
  User,
} from "lucide-react";
import "./Dashboard.css";

function Dashboard() {
  // --- THEME STATE (similar to your login page) ---
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

  // --- MESSAGES POPUP STATE ---
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  // Refs to detect outside clicks
  const messagesButtonRef = useRef(null);
  const messagesPopupRef = useRef(null);

  // Close popup if user clicks outside of it (and outside the button)
  useEffect(() => {
    function handleClickOutside(event) {
      if (isMessagesOpen) {
        if (
          messagesButtonRef.current &&
          !messagesButtonRef.current.contains(event.target) &&
          messagesPopupRef.current &&
          !messagesPopupRef.current.contains(event.target)
        ) {
          setIsMessagesOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMessagesOpen]);

  // --- EXAMPLE MESSAGE STATE (for chat bar at bottom) ---
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    alert(`Message sent: ${message}`);
    setMessage("");
  };

  const currentTheme = isDark ? "dark" : "light";

  return (
    <div className={`theme-container ${currentTheme}`}>
      <div className="main-dashboard-container">
        {/* ========== TOP-LEFT: MESSAGES BUTTON ========== */}
        <div className="top-left">
          <button
            ref={messagesButtonRef}
            className="messages-button"
            onClick={() => setIsMessagesOpen((prev) => !prev)}
          >
            Messages
            <span className="notification-badge">3</span>
          </button>

          {isMessagesOpen && (
            <div ref={messagesPopupRef} className="messages-popup">
              <div className="popup-item">
                <FileText size={16} />
                <span>Text</span>
              </div>
              <div className="popup-item">
                <ImageIcon size={16} />
                <span>Photo</span>
              </div>
              <div className="popup-item">
                <VideoIcon size={16} />
                <span>Video</span>
              </div>
            </div>
          )}
        </div>

        {/* ========== TOP-RIGHT: PROFILE, SETTINGS, THEME TOGGLE ========== */}
        <div className="top-right">
          <User size={24} className="icon" title="Profile" />
          <Settings size={24} className="icon" title="Settings" />
          <button onClick={toggleTheme} className={`theme-toggle ${currentTheme}`}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* ========== MINI-MAP / MAIN CONTENT ========== */}
        <div className="mini-map">
          <p>Mini-Map or Main Content Here</p>
        </div>

        {/* ========== MESSAGE BAR (BOTTOM) ========== */}
        <div className="message-bar-container">
          <input
            className="message-bar"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default Dashboard;
=======
export default Dashboard;
>>>>>>> c977a40 (Webpage)
