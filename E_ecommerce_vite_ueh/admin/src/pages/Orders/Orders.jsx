import React, { useState, useEffect } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from "../../assets/assets"

const Orders = ({ url }) => {

  // State để lưu trữ danh sách đơn hàng
  const [orders, setOrders] = useState([])

  // Hàm lấy tất cả đơn hàng từ API
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data); // Cập nhật state orders với dữ liệu đơn hàng
      console.log(response.data.data); // In ra dữ liệu đơn hàng để kiểm tra
    } else {
      toast.error("Error") // Hiển thị thông báo lỗi nếu lấy dữ liệu thất bại
    }
  }

  // Hàm xử lý thay đổi trạng thái đơn hàng
  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId, // ID của đơn hàng cần thay đổi trạng thái
      status: event.target.value, // Giá trị trạng thái mới từ dropdown
    });
    if (response.data.success) {
      await fetchAllOrders(); // Cập nhật lại danh sách đơn hàng sau khi thay đổi trạng thái
    }
  }

  // useEffect để gọi hàm fetchAllOrders khi component được render lần đầu
  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Trang sản phẩm</h3>
      
      {/* Khu vực hiển thị danh sách đơn hàng */}
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="Parcel Icon" /> {/* Biểu tượng gói hàng */}
              
              <div>
                {/* Hiển thị tên và số lượng từng món ăn trong đơn hàng */}
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quanity; // Nếu là món cuối, chỉ hiển thị tên và số lượng
                    } else {
                      return item.name + " x " + item.quanity + ", "; // Nếu không phải món cuối, thêm dấu phẩy
                    }
                  })}
                </p>
                
                {/* Thông tin tên và email người nhận */}
                <p className="order-item-name">{order.address.Name}</p>
                <p className="order-item-name">{order.address.email}</p>
                
                {/* Thông tin địa chỉ giao hàng */}
                <div className='order-item-address'>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.country + ", " + order.address.zipcode + ", " + order.address.state}</p>
                </div>
                
                {/* Số điện thoại người nhận */}
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              
              {/* Số lượng món trong đơn hàng */}
              <p>Số lượng: {order.items.length}</p>
              
              {/* Tổng tiền đơn hàng */}
              <p>{order.amount},000 VNĐ</p>
              
              {/* Dropdown cho phép thay đổi trạng thái đơn hàng */}
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Đang giao">Đang giao</option>
                <option value="Đã giao">Đã giao</option>
              </select>
            </div>
          );
        })}
      </div>
      
    </div>
  )
}

export default Orders
