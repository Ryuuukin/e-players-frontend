import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password,
      }, { withCredentials: true }); // Ensure credentials are included in the request

      if (response.status === 200) {
        // Fetch validation to determine if the user is admin
        const validateResponse = await axios.get(`${process.env.REACT_APP_API_URL}/validate`, { withCredentials: true });
        const isAdmin = validateResponse.data.message.Email === 'akineshova00@gmail.com';

        if (isAdmin) {
          navigate('/admin/stats');
        } else {
          navigate('/posts');
        }
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" style={{ margin: '10px', padding: '10px 20px' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
