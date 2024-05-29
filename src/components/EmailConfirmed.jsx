// src/components/EmailConfirmed.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmailConfirmed = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Adjust this if your login route is different
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h2>Email Confirmed</h2>
      <p>Your email has been successfully confirmed! You can now log in.</p>
      <button 
        style={{ margin: '10px', padding: '10px 20px' }}
        onClick={handleLoginClick}
      >
        Go to Login
      </button>
    </div>
  );
};

export default EmailConfirmed;
