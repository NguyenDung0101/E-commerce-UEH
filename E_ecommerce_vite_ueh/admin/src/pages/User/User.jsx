import React, { useState, useEffect } from 'react';
import './User.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const User = ({ url }) => {
  const [users, setListuser] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // Lưu thông tin người dùng đang chỉnh sửa
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
  });

  const fetchListUser = async () => {
    const response = await axios.get(`${url}/api/user/list`);
    if (response.data.success) {
      setListuser(response.data.data);
    } else {
      toast.error('Không lấy dữ liệu được');
    }
  };

  const removeUser = async (userId) => {
    const response = await axios.post(`${url}/api/user/remove`, { id: userId });
    await fetchListUser();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error('Error');
    }
  };

  const startEditUser = (user) => {
    setEditingUser(user._id); // Lưu lại id của người dùng đang chỉnh sửa
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      dateOfBirth: new Date(user.dateOfBirth).toISOString().split('T')[0], // Định dạng ngày cho form
      gender: user.gender,
    });
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveUserChanges = async () => {
    try {
      const response = await axios.post(`${url}/api/user/update`, {
        id: editingUser,
        ...formData,
      });
      if (response.data.success) {
        toast.success('Cập nhật thông tin thành công');
        setEditingUser(null); // Reset sau khi lưu xong
        fetchListUser(); // Cập nhật lại danh sách người dùng
      } else {
        toast.error('Không thể cập nhật thông tin');
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi cập nhật thông tin');
    }
  };

  useEffect(() => {
    fetchListUser();
  }, []);

  return (
    <div className='user'>
      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>Họ và tên</th>
              <th>Giới tính</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Ngày sinh</th>
              <th>Ngày đăng ký</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.gender}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{new Date(item.dateOfBirth).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}</td>
                <td>{new Date(item.registrationDate).toLocaleString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}</td>
                <td>
                  <button onClick={() => startEditUser(item)}>Sửa</button>
                  <button onClick={() => removeUser(item._id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form chỉnh sửa */}
      {editingUser && (
        <div className="edit-form">
          <h3>Chỉnh sửa thông tin người dùng</h3>
          <form>
            <div>
              <label>Họ và tên:</label>
              <input type="text" name="name" value={formData.name} onChange={handleFormChange} required
              />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleFormChange} required
              />
            </div>
            <div>
              <label>Số điện thoại:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleFormChange} required
              />
            </div>
            <div>
              <label>Ngày sinh:</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleFormChange} required
              />
            </div>
            <div>
              <label>Giới tính:</label>
              <select name="gender" value={formData.gender} onChange={handleFormChange} required
              >
                <option value="nam">Nam</option>
                <option value="nữ">Nữ</option>
                <option value="khác">Khác</option>
              </select>
            </div>
            <button type="button" onClick={saveUserChanges}>Lưu thay đổi</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default User;
