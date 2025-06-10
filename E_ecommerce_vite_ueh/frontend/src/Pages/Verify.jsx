import React, { useContext, useEffect, useRef } from 'react';
import './CSS/Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(ShopContext);
  const navigate = useNavigate();

  // useRef để ngăn `verifyPayment` chạy nhiều lần
  const isVerified = useRef(false);

  const verifyPayment = async () => {
    if (!success || !orderId) {
      console.log("Missing success or orderId in query parameters");
      return navigate("/"); // Điều hướng về trang chủ nếu thiếu tham số
    }

    try {
      const response = await axios.post(url + "/api/order/verify", { success, orderId });
      if (response.data.success) {
        navigate("/myorders");
      } else {
        console.log("Verification failed");
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    // Kiểm tra nếu hàm chưa được gọi, sau đó gọi và đánh dấu là đã gọi
    if (!isVerified.current) {
      verifyPayment();
      isVerified.current = true; // Đánh dấu là đã gọi để ngăn không gọi lại
    }
  }, []); // Mảng dependencies rỗng để chỉ chạy một lần

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
