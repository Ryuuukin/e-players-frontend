// src/components/UserList.jsx

import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/users?page=${page}`, {
          withCredentials: true,
        });
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/admin/users/${id}`, {
        withCredentials: true,
      });
      setUsers(users.filter(user => user.ID !== id));
    } catch (error) {
      setError('Error deleting user');
    }
  };

  return (
    <div>
      <h2>Users</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.ID}>
            {user.Name} - {user.Email}
            <button onClick={() => handleDelete(user.ID)}>Delete</button>
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

export default UserList;
