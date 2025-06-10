import React, { useContext, useState, useRef } from 'react'; // Import thêm useRef
import './HomeNew.css';
import Item from '../Item/Item';
import { ShopContext } from '../../Context/ShopContext';

const HomeNew = () => {
  const { all_product } = useContext(ShopContext);
  const [menu, setMenu] = useState("new"); // Đặt giá trị mặc định là "new"
  const productGridRef = useRef(null); // Sử dụng useRef để tham chiếu đến phần tử danh sách sản phẩm

  // Hàm để cuộn sang trái
  const handlePrev = () => {
    if (productGridRef.current) {
      productGridRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  // Hàm để cuộn sang phải
  const handleNext = () => {
    if (productGridRef.current) {
      productGridRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='homenew'>
      <div className="product-section">
        <h2 className="product-title">Sản phẩm</h2>
        <div className="product-tabs">
          <span
            onClick={() => setMenu("new")}
            className={menu === "new" ? "tab active" : "tab"}>SẢN PHẨM MỚI
          </span>
          <span
            onClick={() => setMenu("featured")}
            className={menu === "featured" ? "tab active" : "tab"}>NỔI BẬT
          </span>
          <span
            onClick={() => setMenu("sale")}
            className={menu === "sale" ? "tab active" : "tab"}>GIẢM GIÁ
          </span>
        </div>
        <div className="product-grid-wrapper">
          <button className="prev-button" onClick={handlePrev}>&lt;</button>
          <div className="product-grid" ref={productGridRef}>
            {all_product
              .filter((item) => {
                if (menu === "new") return item.category === "uehfood"; // Lọc sản phẩm mới
                if (menu === "featured") return item.category === "thoitrang"; // Lọc sản phẩm nổi bật
                if (menu === "sale") return item.category === "qualuuniem"; // Lọc sản phẩm giảm giá
                return true;
              })
              .map((item, i) => (
                <Item
                  key={i}
                  _id={item._id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              ))}
          </div>
          <button className="next-button" onClick={handleNext}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default HomeNew;
