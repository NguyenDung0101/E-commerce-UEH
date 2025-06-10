import React, { useContext } from 'react'
import './CartItems.css'

import remove_icon from '../Assets/cart_cross_icon.png'
import { ShopContext } from '../../Context/ShopContext'


const CartItems = () => {

  const { all_product, cartItems, removeFromCart, addToCart, url, getTotalAmount } = useContext(ShopContext)

  if (!cartItems) {
    return <p>Giỏ hàng không tồn tại.</p>;
  }
  

  return (
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
      {all_product.map((e, i) => {
        if (cartItems[e._id] > 0) {
          return <div key={e._id}>
            <div className="cartitems-format cartitems-format-main">
              <img src={url +"/images/"+ e.image} alt="" className='carticon-product-icon' />
              <p>{e.name}</p>
              <p>{e.new_price}</p>
              <button className='cartitems-quantity'>{cartItems[e._id]}</button>
              <p>{e.new_price * cartItems[e._id]}</p>
              <p onClick={() => { addToCart(e._id) }}><i className="fa-solid fa-plus"></i></p>
              <img className='carticon-remove-icon' src={remove_icon} alt="" onClick={() => { removeFromCart(e._id) }} />
            </div>
            <hr />
          </div>
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Tổng</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtatal</p>
              <p>${0}</p>
              {/*  */}
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Free</p>
              <p>Free</p>
            </div>
            <div className="cartitems-total-item">
              <p>Total</p>
              <p>$</p> 
              {/* chỗ này thiếu tính tổng số tiền nè nha */}
            </div>
          </div>
          <button>Thanh toán</button>
        </div>
        <div className="cartitems-promocode">
          <p>Nếu bạn có mã giảm giá, nhập vào đây</p>
          <div className="cartitems-promobox">
            <input type="text" />
            <button>Gửi</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CartItems