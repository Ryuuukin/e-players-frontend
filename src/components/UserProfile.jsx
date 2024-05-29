// src/components/UserProfile.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/validate`, {
            withCredentials: true, // Include cookies in the request
          });
        setUser(response.data.message);
      } catch (error) {
        setError('Error fetching user information');
      }
    };

    fetchUser();
  }, []);

  const handleBackRedirect = () => {
    navigate('/posts'); // Navigate to the user profile page
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.Name}</p>
      <p><strong>Email:</strong> {user.Email}</p>
      {/* Add more user details as needed */}

      <button onClick={handleBackRedirect}>Go to Posts</button>
    </div>
  );
};

export default UserProfile;
