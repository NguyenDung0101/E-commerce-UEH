import React, { useContext, useEffect, useState } from 'react'
import './CSS/MyOrders.css'
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { assets } from '../Components/Assets/Assets_food/assets';

const MyOrders = () => { 
  
  const {url, token} = useContext(ShopContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url+"/api/order/userorders", {},{headers:{token}})
    setData(response.data.data)
 
  }

  useEffect(()=>{
    if (token) {
      fetchOrders();
    }
  },[token])
  return (
    <div className='my-orders'>
      <h2>Đơn hàng của tôi</h2>
      <div className="container-o">
        {data.map((order, index)=>{
          return (
            <div key={index} className='my-orders-order'>
              <img src={assets.parcel_icon} alt="" />
              <p>{order.items.map((item,index)=>{
                if (index === order.items.length-1) {
                  return item.name+" x "+item.quantity;
                }
                else {
                  return item.name+" x "+item.quantity + ", "
                }
              })}</p>
              <p>{order.amount},000 VNĐ</p>
              <p>Số lượng: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button onClick={fetchOrders}>Theo dõi đơn hàng</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders