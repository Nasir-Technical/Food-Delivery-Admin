import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminAccess from './components/AdminAccess/AdminAccess';

const App = () => {
  const [token, setToken] = useState(null);
  const url = "http://localhost:4000";
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve token from local storage on component mount
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem('authToken', token); // Store token in local storage
    navigate('/add'); // Navigate to a page after successful login
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('authToken'); // Remove token from local storage
    navigate('/');
  };

  return (
    <div>
      {!token && <AdminAccess onLogin={handleLogin} />}
      <ToastContainer />
      {token && (
        <>
          <Navbar onLogout={handleLogout} />
          <hr />
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path='/add' element={<Add url={url} />} />
              <Route path='/list' element={<List url={url} />} />
              <Route path='/orders' element={<Orders url={url} />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
