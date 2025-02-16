import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const ARModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'closeAR') {
        onClose();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-black">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-[60] p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white"
        aria-label="Close AR view"
      >
        <X size={24} />
      </button>
      <iframe
        src="/ar-receiver.html"
        className="w-full h-full border-0"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          border: 'none'
        }}
        allow="camera;microphone;accelerometer;gyroscope;magnetometer"
        allowFullScreen
        title="AR Sender"
      />
    </div>
  );
};

export default ARModal;