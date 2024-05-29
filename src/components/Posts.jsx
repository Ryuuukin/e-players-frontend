import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
          withCredentials: true, // Include cookies in the request
        });
        setPosts(response.data.posts);
      } catch (error) {
        setError('Error fetching posts');
      }
    };

    fetchPosts();
  }, []);

  const handleProfileRedirect = () => {
    navigate('/validate'); // Navigate to the user profile page
  };

  return (
    <div>
      <h2>Posts</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.ID}>
            <h3>{post.Title}</h3>
            <p>{post.Body}</p>
          </li>
        ))}
      </ul>

      <button onClick={handleProfileRedirect}>Go to Profile</button>
    </div>
  );
};

export default Posts;
