import React, { useContext, useEffect, useState } from 'react';
import './CSS/ProfileEditUser.css';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProfileEditUser = () => {
  // Lấy URL API và token từ ShopContext
  const { url, token } = useContext(ShopContext);

  // State lưu trữ thông tin người dùng cần chỉnh sửa
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
  });

  const navigate = useNavigate();

  // Hàm gọi API để lấy dữ liệu thông tin người dùng
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${url}/api/user/profile`, {
        headers: { token },
      });
      if (response.data.success) {
        setUser(response.data.data); // Lưu dữ liệu người dùng vào state
      } else {
        console.log('Failed to fetch user data:', response.data.message);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  // useEffect để gọi API lấy thông tin người dùng khi component được render
  useEffect(() => {
    if (token) {
      fetchUserData(); // Chỉ gọi API nếu có token
    }
  }, [token]);

  // Hàm xử lý khi có sự thay đổi trong các input
  const onChangeHandler = (e) => {
    const { name, value } = e.target; // Lấy tên và giá trị của input
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value, // Cập nhật state theo tên của input
    }));
  };

  // Hàm lưu các thay đổi thông tin người dùng
  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/api/user/update`,
        {
          id: user._id, // Gửi ID và thông tin người dùng cập nhật đến API
          ...user,
        },
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        alert('Cập nhật thông tin thành công'); // Thông báo cập nhật thành công
        navigate('/profile'); // Quay lại trang thông tin người dùng
      } else {
        alert('Cập nhật thất bại: ' + response.data.message);
      }
    } catch (error) {
      console.log('Error updating user:', error);
      alert('Đã xảy ra lỗi khi cập nhật thông tin');
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Chỉnh sửa thông tin cá nhân</h2>

      {/* Form chỉnh sửa thông tin người dùng */}
      <form onSubmit={saveChanges} className="edit-profile-form">
        {/* Nhập tên người dùng */}
        <label>
          Họ và tên:
          <input type="text" name="name" value={user.name} onChange={onChangeHandler} required/>
        </label>
        {/* Nhập email người dùng */}
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={onChangeHandler} required/>
        </label>
        {/* Nhập số điện thoại */}
        <label>
          Số điện thoại:
          <input type="tel" name="phone" value={user.phone} onChange={onChangeHandler} required/>
        </label>
        {/* Nhập ngày sinh */}
        <label>
          Ngày sinh:
          <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={onChangeHandler} required/>
        </label>
        {/* Chọn giới tính */}
        <label>
          Giới tính:
          <select name="gender" value={user.gender} onChange={onChangeHandler} required
          >
            <option value="nam">Nam</option>
            <option value="nữ">Nữ</option>
            <option value="khác">Khác</option>
          </select>
        </label>
        {/* Nút lưu thay đổi */}
        <button type="submit" className="save-button">
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default ProfileEditUser;
