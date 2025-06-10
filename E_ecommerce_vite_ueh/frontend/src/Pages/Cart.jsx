import React, { useContext, useState, useEffect } from "react";
import './CSS/Cart.css';
import axios from 'axios';
import { ShopContext } from "../Context/ShopContext";
import remove_icon from '../Components/Assets/cart_cross_icon.png';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Cart = () => {
  const { all_product, cartItems, removeFromCart, addToCart, url, getTotalAmount } = useContext(ShopContext);
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(getTotalAmount()); 
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [couponApplied, setCouponApplied] = useState(false);

  // Tải danh sách mã giảm giá khả dụng từ server
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(`${url}/api/coupons/list`);
        if (response.data.success) {
          setAvailableCoupons(response.data.data);
        }
      } catch (error) {
        toast.error("Không thể lấy danh sách mã giảm giá.");
      }
    };

    fetchCoupons();
  }, [url]);

  // Cập nhật finalAmount mỗi khi có thay đổi trong giỏ hàng hoặc discountAmount
  useEffect(() => {
    const total = getTotalAmount();
    const shippingFee = 10;  // Phí giao hàng
    const updatedFinalAmount = total + shippingFee - discountAmount;
    setFinalAmount(updatedFinalAmount);

    // Lưu finalAmount vào localStorage
    localStorage.setItem("finalAmount", updatedFinalAmount);
  }, [getTotalAmount, discountAmount]);

  // Xử lý áp dụng mã giảm giá
  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post(`${url}/api/coupons/apply`, { code: promoCode, amount: getTotalAmount() });
      if (response.data.success) {
        setDiscountAmount(response.data.discountAmount);
        setCouponApplied(true);
        toast.success(response.data.message);
      } else {
        setCouponApplied(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      setCouponApplied(false);
      toast.error(error.response?.data?.message || "Không thể áp dụng mã giảm giá.");
    }
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handleCouponClick = (code) => {
    setPromoCode(code);
  };

  return (
    <div>
      <div className='cartitems'>
        <h2>Thông tin sản phẩm</h2>
        <div className="cartitems-format-main">
          <p>Sản phẩm</p>
          <p>Tên</p>
          <p>Giá</p>
          <p>Số lượng</p>
          <p>Tổng tiền</p>
          <p>Thêm</p>
          <p>Xóa</p>
        </div>
        <hr />
        {all_product.map((e) => {
          if (cartItems[e._id] > 0) {
            return (
              <div key={e._id}>
                <div className="cartitems-format cartitems-format-main">
                  <img src={url + "/images/" + e.image} alt="" className='carticon-product-icon' />
                  <p>{e.name}</p>
                  <p>{e.new_price}</p>
                  <button className='cartitems-quantity'>{cartItems[e._id]}</button>
                  <p>{e.new_price * cartItems[e._id]}</p>
                  <p onClick={() => { addToCart(e._id) }}><i className="fa-solid fa-plus"></i></p>
                  <img className='carticon-remove-icon' src={remove_icon} alt="" onClick={() => { removeFromCart(e._id) }} />
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}

        {/* Tổng tiền và Mã giảm giá */}
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Tổng</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Tổng cộng</p>
                <p>{getTotalAmount() + ",000 VNĐ"}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Phí giao hàng</p>
                <p>10,000 VNĐ</p>
              </div>
              <div className="cartitems-total-item">
                <p>Giảm giá</p>
                <p>{discountAmount + ",000 VNĐ"}</p>
              </div>
              <div className="cartitems-total-item">
                <p>Tổng</p>
                <p>{finalAmount + ",000 VNĐ"}</p>
              </div>
            </div>
            <button onClick={() => navigate('/order')}>Thanh toán</button>
          </div>

          {/* Phần Mã giảm giá */}
          <div className="cartitems-promocode">
            <p>Nếu bạn có mã giảm giá, nhập vào đây</p>
            <div className="cartitems-promobox">
              <input
                type="text"
                value={promoCode}
                onChange={handlePromoCodeChange}
                placeholder="Nhập mã giảm giá"
              />
              <button onClick={handleApplyCoupon}>Áp dụng</button>
            </div>
            {couponApplied && <p className="coupon-success">Áp dụng mã giảm giá thành công!</p>}

            {/* Danh sách mã giảm giá khả dụng */}
            <div className="available-coupons">
              <h2>Mã giảm giá khả dụng</h2>
              <ul>
                {availableCoupons.map((coupon) => (
                  <li key={coupon._id} onClick={() => handleCouponClick(coupon.code)}>
                    <p>
                      Mã code: {coupon.code} - Đơn tối thiểu: {coupon.minPurchase},000 VNĐ - Giảm {coupon.discount}
                      {coupon.discountType === "percent" ? "%" : " VND"} - Hết hạn:{" "}
                      {new Date(coupon.expiryDate).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                      })} - Số lượng còn lại: {coupon.usageLimit - coupon.usedCount}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
