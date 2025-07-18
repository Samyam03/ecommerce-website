import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  // Close sidebar on route change (optional, for better UX)
  // useEffect(() => {
  //   setSidebarOpen(false);
  // }, [location]);

  return (
    <div className='bg-gray-50 min-h-screen flex flex-col'>
      <ToastContainer />
      {token === "" ? <Login setToken={setToken} /> :
        <>
          <Navbar setToken={setToken} onSidebarToggle={() => setSidebarOpen(v => !v)} />
          <hr />
          <div className="flex flex-row w-full flex-1 min-h-0">
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <div className='flex-1 mt-16 text-gray-600 text-base transition-all duration-300 md:ml-64' style={{ marginLeft: sidebarOpen ? 0 : undefined }}>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
                <Route path='/' element={<Navigate to="/add" />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default App;
