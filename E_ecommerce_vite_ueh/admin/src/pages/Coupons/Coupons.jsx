import React, { useEffect, useState } from 'react';
import './Coupons.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Coupons = ({ url }) => {

  // State để lưu danh sách mã giảm giá
  const [coupons, setListCoupons] = useState([]);
  
  // State để lưu dữ liệu của mã giảm giá mới cần thêm
  const [newCoupon, setNewCoupon] = useState({
    code: "",            // Mã code của mã giảm giá
    discount: 0,         // Giá trị giảm giá
    discountType: "percent", // Loại giảm giá (phần trăm hoặc cố định)
    expiryDate: "",      // Ngày hết hạn của mã giảm giá
    minPurchase: 0,      // Mức chi tiêu tối thiểu để áp dụng mã
    usageLimit: 1,       // Số lần sử dụng tối đa của mã giảm giá
  });

  // Hàm lấy danh sách mã giảm giá từ API
  const fetchListCoupon = async () => {
    try {
      const response = await axios.get(`${url}/api/coupons/list`);
      if (response.data.success) {
        setListCoupons(response.data.data); // Cập nhật state với danh sách mã giảm giá
      } else {
        toast.error('Không lấy mã giảm giá được'); // Thông báo nếu có lỗi
      }
    } catch (error) {
      toast.error(`Lỗi kết nối: ${error.message}`); // Thông báo lỗi kết nối nếu không lấy được dữ liệu
    }
  };

  // Hàm thêm mã giảm giá mới
  const handleAddCoupon = async () => {
    try {
      const response = await axios.post(`${url}/api/coupons/add`, newCoupon);
      if (response.data.success) {
        toast.success(response.data.message); // Thông báo khi thêm thành công
        fetchListCoupon(); // Cập nhật lại danh sách mã giảm giá
        // Reset form sau khi thêm mã giảm giá thành công
        setNewCoupon({
          code: "",
          discount: 0,
          discountType: "percent",
          expiryDate: "",
          minPurchase: 0,
          usageLimit: 1,
        });
      } else {
        toast.error(response.data.message); // Thông báo nếu thêm thất bại
      }
    } catch (error) {
      toast.error(`Lỗi khi thêm mã giảm giá: ${error.message}`); // Thông báo lỗi nếu không thêm được mã
    }
  };

  // Hàm xóa mã giảm giá dựa trên ID
  const handleRemoveCoupon = async (couponId) => {
    try {
      const response = await axios.delete(`${url}/api/coupons/remove/${couponId}`);
      if (response.data.success) {
        toast.success(response.data.message); // Thông báo khi xóa thành công
        fetchListCoupon(); // Cập nhật lại danh sách mã giảm giá
      } else {
        toast.error('Không thể xóa mã giảm giá'); // Thông báo nếu không xóa được mã
      }
    } catch (error) {
      toast.error(`Lỗi khi xóa mã giảm giá: ${error.message}`); // Thông báo lỗi khi xóa thất bại
    }
  };

  // Hàm xử lý thay đổi trong form thêm mã giảm giá
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon({ ...newCoupon, [name]: value }); // Cập nhật state khi người dùng nhập vào form
  };

  // useEffect để gọi hàm fetchListCoupon khi component được render lần đầu
  useEffect(() => {
    fetchListCoupon();
  }, []);

  // Hàm định dạng ngày tháng cho mã giảm giá
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="coupons">
      <div className="coupon-manager">
        <h1>Quản Lý Mã Giảm Giá</h1>
        
        {/* Form Thêm mã giảm giá */}
        <div className="add-coupon-form">
          <h2>Thêm Mã Giảm Giá Mới</h2>
          <p>Nhập mã code</p>
          <input type="text" name="code" placeholder="Mã" value={newCoupon.code} onChange={handleInputChange} />
          <p>Nhập giá trị giảm giá</p>
          <input type="number" name="discount" placeholder="Giá trị giảm" value={newCoupon.discount} onChange={handleInputChange} />
          <p>Đơn vị giảm giá</p>
          <select name="discountType" value={newCoupon.discountType} onChange={handleInputChange}>
            <option value="percent">Phần trăm</option>
            <option value="fixed">Số tiền cố định</option>
          </select>
          <p>Ngày hết hạn</p>
          <input type="date" name="expiryDate" value={newCoupon.expiryDate} onChange={handleInputChange} />
          <p>Mức chi tiêu tối thiểu</p>
          <input type="number" name="minPurchase" placeholder="Mức chi tiêu tối thiểu" value={newCoupon.minPurchase} onChange={handleInputChange} />
          <p>Số lần sử dụng</p>
          <input type="number" name="usageLimit" placeholder="Số lần sử dụng" value={newCoupon.usageLimit} onChange={handleInputChange} />
          <button onClick={handleAddCoupon}>Thêm Mã</button>
        </div>

        {/* Danh sách mã giảm giá */}
        <div className="coupon-list">
          <h2>Danh Sách Mã Giảm Giá</h2>
          <table>
            <thead>
              <tr>
                <th>Mã</th>
                <th>Giá trị</th>
                <th>Loại</th>
                <th>Ngày hết hạn</th>
                <th>Chi tiêu tối thiểu</th>
                <th>Số lần sử dụng</th>
                <th>Số lượng đã dùng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(coupon => (
                <tr key={coupon._id}>
                  <td>{coupon.code}</td> {/* Mã code của mã giảm giá */}
                  <td>{coupon.discount}</td> {/* Giá trị giảm giá */}
                  <td>{coupon.discountType === "percent" ? "%" : "VND"}</td> {/* Loại giảm giá */}
                  <td>{formatDate(coupon.expiryDate)}</td> {/* Ngày hết hạn của mã giảm giá */}
                  <td>{coupon.minPurchase}</td> {/* Mức chi tiêu tối thiểu */}
                  <td>{coupon.usageLimit}</td> {/* Số lần sử dụng tối đa */}
                  <td>{coupon.usedCount}</td> {/* Số lần đã sử dụng */}
                  <td>
                    <button className="delete-btn" onClick={() => handleRemoveCoupon(coupon._id)}>Xóa</button> {/* Nút xóa mã giảm giá */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
