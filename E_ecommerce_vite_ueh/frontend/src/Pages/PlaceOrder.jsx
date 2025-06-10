import React, { useContext, useEffect, useState } from 'react';
import './CSS/PlaceOrder.css';
import { ShopContext } from "../Context/ShopContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  // Context and Navigation
  const { getTotalAmount, token, all_product, cartItems, url, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  // State Variables
  const [finalAmount, setFinalAmount] = useState(localStorage.getItem('finalAmount') || getTotalAmount() + 2);
  const [data, setData] = useState({
    Name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
  });

  // Fetch User Data
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${url}/api/user/profile`, {
        headers: { token },
      });
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        console.log('Failed to fetch user data:', response.data.message);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  // Effects
  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      Name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      state: "Thanh toán khi nhận hàng",
      country: "Việt Nam",
    }));
  }, [user]);

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  // Handlers
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    all_product.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: finalAmount,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      if (response.data.success) {
        setCartItems({});
        // Điều hướng về trang xác nhận thanh toán với orderId và success
        navigate(`/verify?success=true&orderId=${response.data.orderId}`);
      } else {
        alert("Error: " + response.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      alert("Không thể hoàn tất đơn hàng");
    }
  };

  // Render
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className="title">Thông tin vận chuyển</p>
        <div className="multi-fields">
          <input required name='Name' onChange={onChangeHandler} value={data.Name} type="text" placeholder='Họ và tên' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Địa chỉ Email' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Số, Đường' />
        <div className="multi-fields">
          <input required type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='Huyện/Xã' />
          <input required type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='Phương thức giao hàng' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Tỉnh/Thành phố' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Nước' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Số điện thoại' />
      </div>
      <div className="place-order-right">
        <div className="cartitems-total">
          <h1>Tổng</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{getTotalAmount()},000 VNĐ</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>{10},000 VNĐ</p>
            </div>
            <div className="cartitems-total-item">
              <p>Total</p>
              <p>{finalAmount},000 VNĐ</p>
            </div>
          </div>
          <button type='submit'>Xác nhận thanh toán</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
