// src/components/CreatePostForm.jsx

import React, { useState } from 'react';
import axios from '../../axiosConfig';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/create-posts`, {
        Title: title,
        Body: body,
      }, {
        withCredentials: true,
      });
      setTitle('');
      setBody('');
      setSuccess('Post created successfully');
    } catch (error) {
      setError('Error creating post');
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Body:
            <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
          </label>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePostForm;
