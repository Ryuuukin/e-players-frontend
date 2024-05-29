// src/components/PostList.jsx

import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/posts?page=${page}`, {
          withCredentials: true,
        });
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError('Error fetching posts');
      }
    };

    fetchPosts();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/admin/posts/${id}`, {
        withCredentials: true,
      });
      setPosts(posts.filter(post => post.ID !== id));
    } catch (error) {
      setError('Error deleting post');
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {posts.map(post => (
          <li key={post.ID}>
            {post.Title} - {post.Body}
            <button onClick={() => handleDelete(post.ID)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span> Page {page} of {totalPages} </span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default PostList;
