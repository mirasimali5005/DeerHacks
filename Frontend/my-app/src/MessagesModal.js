import React, { useState, useEffect } from "react";
import "./MessagesModal.css";

const DUMMY_LAT = 51.39908257057500;
const DUMMY_LNG = 0.1364062125017154;

const MessagesModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetch(`https://firebase-backend-a2m7.onrender.com/getNearbyMessages?lat=${DUMMY_LAT}&lng=${DUMMY_LNG}`)
        .then((res) => res.json())
        .then((data) => {
          setMessages(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching messages:", err);
          setMessages([{ text: "Error fetching messages.", lat: DUMMY_LAT, lng: DUMMY_LNG }]);
          setLoading(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null; // Do not render if modal is closed

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Nearby Messages</h2>
        <button className="close-button" onClick={onClose}>Back</button>

        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length > 0 ? (
          <ul>
            {messages.map((msg, index) => (
              <li key={index} className="message-item">
                {msg.text}
              </li>
            ))}
          </ul>
        ) : (
          <p>No nearby messages found.</p>
        )}
      </div>
    </div>
  );
};

export default MessagesModal;
