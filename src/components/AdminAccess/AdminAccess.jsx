import React, { useState } from 'react';
import './AdminAccess.css';
import { BACKEND_URL } from '../../config'; // Adjust the import path if necessary

const AdminAccess = ({ onLogin }) => {
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!secretKey.trim()) {
      setError('Secret key cannot be empty.');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/user/admin-access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secretKey }),
      });
      const data = await response.json();
      if (response.ok) {
        onLogin(data.token); // Pass token to App component
      } else {
        setError(data.message || 'Failed to authenticate');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className='admin-access'>
      <form onSubmit={handleSubmit}>
        <h1>Admin Access</h1>
        <input
          type='password'
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder='Enter secret key'
        />
        <button type='submit'>Submit</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
};

export default AdminAccess;
