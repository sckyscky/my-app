import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="toast">
      <div className="toast-message">
        <span>✓</span> {message}
      </div>
    </div>
  );
};

export default Toast;
