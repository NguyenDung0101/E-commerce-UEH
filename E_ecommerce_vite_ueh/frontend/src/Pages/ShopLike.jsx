import React, { useContext } from 'react';
import './CSS/ShopLike/ShopLike.css';
import style from './CSS/ShopLike/ShopLike.module.css';
import Item from '../Components/Item/Item';
import { ShopContext } from '../Context/ShopContext';

const ShopLike = () => {
  const { all_product, favItems } = useContext(ShopContext);
  
  return (
    <div>
      <div className={style.news_header}>
        <h1 className={style.title}>Danh sách sản phẩm yêu thích</h1>
        <div className={style.breadcrumb}>
          <h3 className={style.breadcrumb_1}>Trang chủ</h3>
          <i className="fa-solid fa-chevron-right"></i>
          <span className={style.breadcrumb_1}>Danh sách sản phẩm yêu thích</span>
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          // Kiểm tra nếu item._id tồn tại trong favItems và có giá trị là 1
          if (favItems[item._id] === 1) {
            return (
              <div key={i}>
                <Item
                  _id={item._id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              </div>
            );
          }
          return null; // Trả về null nếu điều kiện không thỏa mãn
        })}
      </div>
    </div>
  );
};

export default ShopLike;
