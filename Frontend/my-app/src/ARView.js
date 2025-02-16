// src/components/ARView.js
import React, { useEffect, useState } from 'react';

const ARView = ({ onClose, message }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadScripts = async () => {
      try {
        if (window.AFRAME || document.querySelector('script[src*="aframe"]')) {
          console.log('A-Frame already loaded');
          setIsLoading(false);
          return;
        }

        const aframeScript = document.createElement('script');
        aframeScript.src = 'https://aframe.io/releases/1.2.0/aframe.min.js';
        document.head.appendChild(aframeScript);

        await new Promise((resolve, reject) => {
          aframeScript.onload = resolve;
          aframeScript.onerror = () => reject(new Error('Failed to load A-Frame'));
        });

        if (!mounted) return;

        const arjsScript = document.createElement('script');
        arjsScript.src = 'https://cdn.jsdelivr.net/gh/jeromeetienne/AR.js@1.7.2/aframe/build/aframe-ar.min.js';
        document.head.appendChild(arjsScript);

        await new Promise((resolve, reject) => {
          arjsScript.onload = resolve;
          arjsScript.onerror = () => reject(new Error('Failed to load AR.js'));
        });

        if (mounted) {
          setIsLoading(false);
          setTimeout(() => {
            const displayText = document.getElementById('displayText');
            if (displayText) {
              displayText.setAttribute(
                'text',
                `value: ${message}; color: white; align: center;`
              );
            }
          }, 1000);
        }
      } catch (err) {
        console.error('Error loading AR scripts:', err);
        if (mounted) {
          setError('Failed to load AR components. Please try again.');
          setIsLoading(false);
        }
      }
    };

    loadScripts();

    return () => {
      mounted = false;
      const scripts = document.querySelectorAll('script[src*="aframe"], script[src*="ar.js"]');
      scripts.forEach(script => script.remove());

      const scene = document.querySelector('a-scene');
      if (scene) {
        scene.parentNode.removeChild(scene);
      }
    };
  }, [message]);

  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem'
      }}>
        Loading AR view...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '1rem'
      }}>
        <div>{error}</div>
        <button 
          onClick={onClose}
          style={{
            padding: '8px 16px',
            backgroundColor: '#EF4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="ar-view">
      <button 
        className="close-ar-button"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 1000,
          padding: '8px 16px',
          backgroundColor: '#EF4444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Close AR
      </button>
      <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        <a-entity
          id="displayText"
          text="value: Loading...; color: white; align: center;"
          position="0 1.5 -2"
        />
        <a-camera position="0 1.6 0" />
      </a-scene>
    </div>
  );
};

export default ARView;