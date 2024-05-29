// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/`);
        setMessage(response.data.message);
      } catch (error) {
        console.error('There was an error fetching the welcome message!', error);
      }
    };

    fetchMessage();
  }, []);

  useEffect(() => {
    const container = document.querySelector('.background');
    const sparklesCount = 100;

    for (let i = 0; i < sparklesCount; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(sparkle);
    }
  }, []);

  return (
    <>
      <div className="background"></div>
      <div className="container">
        <h1>{message}</h1>
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
