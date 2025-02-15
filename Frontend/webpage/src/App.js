import React, { useState } from "react";
import "./App.css";

function App() {
  const [showMessages, setShowMessages] = useState(false);
  const [dropMessage, setDropMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");

  const handleDropMessage = () => {
    console.log("Message Dropped:", messageTitle, dropMessage);
    setShowModal(false);
    setMessageTitle("");
    setDropMessage("");
  };

  return (
    <div className="container">
      {/* Top Left - Messages Button */}
      <button
        className="messages-button"
        onClick={() => setShowMessages(!showMessages)}
      >
        Messages
      </button>
      {showMessages && (
        <div className="popup-menu">
          <p>Message 1</p>
          <p>Message 2</p>
          <p>Message 3</p>
        </div>
      )}

      {/* Top Right - Profile & Settings */}
      <div className="top-right">
        <div className="profile-icon">👤</div>
        <div className="settings-icon">⚙️</div>
      </div>

      {/* Mini Map Section */}
      <div className="mini-map">
        <button className="drop-message-button" onClick={() => setShowModal(true)}>
          Drop a Message
        </button>
      </div>

      {/* Message Drop Modal */}
      {showModal && (
        <div className="modal-background">
          <div className="modal-content">
            <h3 className="modal-title">Drop a Message</h3>
            <input
              type="text"
              placeholder="Title"
              value={messageTitle}
              onChange={(e) => setMessageTitle(e.target.value)}
              className="input-field"
            />
            <textarea
              placeholder="Your message..."
              value={dropMessage}
              onChange={(e) => setDropMessage(e.target.value)}
              className="input-field"
            ></textarea>
            <div className="modal-buttons">
              <button onClick={handleDropMessage} className="confirm-button">
                Confirm
              </button>
              <button onClick={() => setShowModal(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;