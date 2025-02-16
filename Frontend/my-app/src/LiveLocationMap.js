import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import messageIcon from "./pointer-.png"; // Import the message icon

const containerStyle = {
  width: "100%",
  height: "100%",
};

const API_URL = "https://firebase-backend-a2m7.onrender.com/getNearbyMessages";

function LiveLocationMap() {
  const [location, setLocation] = useState(null);
  const [messages, setMessages] = useState([]);

  // Function to fetch nearby messages from the backend
  const fetchNearbyMessages = async (lat, lng) => {
    try {
      const response = await fetch(`${API_URL}?lat=${lat}&lng=${lng}`);
      const data = await response.json();
      setMessages(data); // Update messages in state
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Get live location and update messages when location changes
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);
          fetchNearbyMessages(userLocation.lat, userLocation.lng); // Fetch messages immediately
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Periodically fetch messages every 5 seconds to update new messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (location) {
        fetchNearbyMessages(location.lat, location.lng);
      }
    }, 10000000000000000); // 1000ms=1sec

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [location]); // Run whenever location updates

  // Use live location if available, otherwise fallback to Toronto
  const center = location || { lat: 43.6535, lng: -79.3835 };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBDzpNk4DWSJjuKcyTEA_8eErVIdMtF0nU">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {/* Marker for user's live location */}
        {location && <Marker position={location} />}

        {/* Markers for messages from API */}
        {messages.map((message) => (
          <Marker
            key={message.id}
            position={{ lat: message.lat, lng: message.lng }}
            icon={{
              url: messageIcon, // Custom icon for messages
              scaledSize: new window.google.maps.Size(45, 45),
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default LiveLocationMap;
