// src/components/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState(''); // Change variable name to 'name'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
        Name: name, // Send 'Name' instead of 'username'
        email,
        password,
      });
      if (response.status === 200) {
        navigate('/email-confirm');
      }
    } catch (error) {
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name: {/* Change label to 'Name' */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ margin: '10px', padding: '10px 20px' }}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
