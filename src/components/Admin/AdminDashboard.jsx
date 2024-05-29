// src/components/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ user_count: 0, post_count: 0 });
  const navigate = useNavigate();


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/stats`, {
          withCredentials: true,
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const handleUserListRedirect = () => {
    navigate('/admin/users');
  };
  const handleCreatePostRedirect = () => {
    navigate('/admin/create-posts');
  };
  const handlePostListRedirect = () => {
    navigate('/admin/posts'); 
  };
  const handleSendEmailRedirect = () => {
    navigate('/admin/send-email');
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p><strong>Number of Users:</strong> {stats.user_count}</p>
      <p><strong>Number of Posts:</strong> {stats.post_count}</p>
      <button onClick={handleUserListRedirect}>USER LIST</button>
      <button onClick={handlePostListRedirect}>POST LIST</button>
      <button onClick={handleCreatePostRedirect}>CREATE POST</button>
      <button onClick={handleSendEmailRedirect}>SEND EMAIL</button>
    </div>
  );
};

export default AdminDashboard;
