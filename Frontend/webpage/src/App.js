import React, { useState } from "react";
import "./App.css";

function App() {
  const [showMessages, setShowMessages] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const messages = ["Message 1", "Message 2", "Message 3"];

  return (
    <div className="container">
      {/* Top Left - Messages Button with Notification
      <button
        className="messages-button"
        onClick={() => setShowMessages(!showMessages)}
      >
        Messages {messages.length > 0 && <span className="notification-badge">{messages.length}</span>}
      </button>
      {showMessages && (
        <div className="popup-overlay">
          <div className="popup-menu">
            {messages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
            <button onClick={() => setShowMessages(false)} className="close-button">Close</button>
          </div>
        </div>
      )} */}
    <div className="top-left">
      <button
        className="messages-button"
        onClick={() => setShowMessages(!showMessages)}
      >
        Messages{" "}
        {messages.length > 0 && (
          <span className="notification-badge">{messages.length}</span>
        )}
      </button>
    </div>
      {/* Top Right - Profile & Settings */}
      <div className="top-right">
        <div className="profile-icon">👤</div>
        <div className="settings-icon">⚙️</div>
      </div>

      {/* Mini Map Section */}
      <div className="mini-map">
        <button className="open-popup-button" onClick={() => setShowPopup(true)}>
          Open AR Window
        </button>
      </div>

      {/* Popup Window with Greyed Out Background */}
      {showPopup && (
        <div className="modal-overlay" onClick={() => setShowPopup(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>AR Placeholder Window</h2>
            <p>This space is allocated for future AR features.</p>
            <button onClick={() => setShowPopup(false)} className="close-button">X</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;