import React, { useState } from 'react';
import axios from '../../axiosConfig';

const SendEmailForm = () => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/send-email`, {
        subject,
        content,
      }, {
        withCredentials: true,
      });
      setSubject('');
      setContent('');
      setSuccess('Email sent successfully');
      setError(''); // Clear any previous error message
    } catch (error) {
      setSuccess(''); // Clear any previous success message
      setError('Error sending email');
    }
  };

  return (
    <div>
      <h2>Send Email</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Subject:
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default SendEmailForm;
