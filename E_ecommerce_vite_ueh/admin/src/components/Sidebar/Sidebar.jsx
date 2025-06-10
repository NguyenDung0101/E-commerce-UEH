import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className='sidebar-options'>
        <NavLink to='/user' className='sidebar-option'>
          <img src={assets.user_icon} alt='' />
          <p>Người dùng</p>
        </NavLink>
        <NavLink to='/add' className='sidebar-option'>
          <img src={assets.add_icon} alt='' />
          <p>Thêm sản phẩm</p>
        </NavLink>
        <NavLink to='/list' className='sidebar-option'>
          <img src={assets.order_icon} alt='' />
          <p>Danh sách sản phẩm</p>
        </NavLink>
        <NavLink to='/orders' className='sidebar-option'>
          <img src={assets.order_icon} alt='' />
          <p>Đơn hàng</p>
        </NavLink>
        <NavLink to='/coupons' className='sidebar-option'>
          <img src={assets.order_icon} alt='' />
          <p>Mã giảm giá</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
