import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from './pages/User/User';
import Coupons from './pages/Coupons/Coupons';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = "http://localhost:4000";

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn && location.pathname !== '/' && location.pathname !== '/register') {
      navigate('/');
    }
  }, [navigate, location.pathname]);

  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <ToastContainer />
      {!isAuthPage && <Navbar toggleSidebar={toggleSidebar} />}
      <hr />
      <div className={`app-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {!isAuthPage && <Sidebar isOpen={isSidebarOpen} />}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user' element={<User url={url} />} />
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/orders' element={<Orders url={url} />} />
          <Route path='/coupons' element={<Coupons url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
