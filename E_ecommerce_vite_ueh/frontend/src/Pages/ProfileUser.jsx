import React, { useContext, useEffect, useState } from 'react';
import './CSS/ProfileUser.css';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProfileUser = () => {
  // Lấy URL API và token từ ShopContext
  const { url, token } = useContext(ShopContext);

  // Trạng thái thông tin người dùng
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
  });

  // Các trạng thái cho form đổi mật khẩu
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  // Hàm xử lý thay đổi mật khẩu
  const changePassword = async (e) => {
    e.preventDefault();
    
    // Kiểm tra xem mật khẩu mới có khớp với xác nhận mật khẩu không
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }
    
    // Gửi yêu cầu đổi mật khẩu đến API
    try {
      const response = await axios.put(
        `${url}/api/user/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: { token },
        }
      );
      
      if (response.data.success) {
        alert('Đổi mật khẩu thành công'); // Thông báo đổi mật khẩu thành công
        // Xóa thông tin mật khẩu khỏi các ô nhập liệu
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowChangePassword(false); // Đóng form đổi mật khẩu
      } else {
        alert('Đổi mật khẩu thất bại: ' + response.data.message);
      }
    } catch (error) {
      console.log('Error changing password:', error);
      alert('Đã xảy ra lỗi khi đổi mật khẩu');
    }
  };

  // Định dạng ngày sinh của người dùng để hiển thị theo kiểu ngày/tháng/năm
  const formattedDateOfBirth = new Date(user.dateOfBirth).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="user-profile-container">
      <div className="user-card-full">
        
        {/* Phần hiển thị ảnh đại diện và tên người dùng */}
        <div className="user-profile">
          <img
            src="https://img.icons8.com/bubbles/100/000000/user.png"
            className="profile-image"
            alt="User Profile"
          />
          <p>Khách hàng</p>
          <h6 className="profile-name">{user.name}</h6>
        </div>
        
        {/* Thông tin chi tiết về người dùng */}
        <div className="card-content">
          <h6 className="section-title">Thông tin cá nhân</h6>
          <div className="info-row">
            {/* Các thông tin cá nhân */}
            <div className="info-item">
              <p className="info-label">Email</p>
              <p className="info-value">{user.email}</p>
            </div>
            <div className="info-item">
              <p className="info-label">Số điện thoại</p>
              <p className="info-value">{user.phone}</p>
            </div>
            <div className="info-item">
              <p className="info-label">Giới tính</p>
              <p className="info-value">{user.gender}</p>
            </div>
            <div className="info-item">
              <p className="info-label">Ngày sinh</p>
              <p className="info-value">{formattedDateOfBirth}</p>
            </div>
          </div>
          
          {/* Các hành động người dùng có thể thực hiện */}
          <div className="user-actions">
            {/* Nút chuyển đến trang cập nhật thông tin */}
            <button
              className="action-button primary-button"
              onClick={() => navigate('/edit-profile')}
            >
              Cập nhật thông tin
            </button>
            
            {/* Nút xem lịch sử giỏ hàng */}
            <button
              className="action-button secondary-button"
              onClick={() => navigate('/myorders')}
            >
              Xem lịch sử đơn hàng
            </button>
            
            {/* Nút mở form đổi mật khẩu */}
            <button
              className="action-button change-password-button"
              onClick={() => setShowChangePassword(!showChangePassword)}
            >
              Đổi mật khẩu
            </button>
          </div>
          
          {/* Form đổi mật khẩu */}
          {showChangePassword && (
            <form onSubmit={changePassword} className={`change-password-form ${showChangePassword ? 'show-change-password' : ''}`}>
              <h3>Đổi mật khẩu</h3>
              
              {/* Trường nhập mật khẩu hiện tại */}
              <label>Mật khẩu hiện tại:</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              
              {/* Trường nhập mật khẩu mới */}
              <label>Mật khẩu mới:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              
              {/* Trường xác nhận mật khẩu mới */}
              <label>Xác nhận mật khẩu mới:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              
              {/* Nút xác nhận đổi mật khẩu */}
              <button type="submit" className="save-button-pass">Xác nhận đổi mật khẩu</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
