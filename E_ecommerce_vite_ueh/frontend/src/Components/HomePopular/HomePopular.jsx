import React, { useContext, useRef } from 'react'; // Import useRef
import './HomePopular.css';
import Item from '../Item/Item';
import bannerSale from '../Assets/HomeComponents/bannerSale.png';
import { ShopContext } from '../../Context/ShopContext';

const HomePopular = () => {
  const { all_product } = useContext(ShopContext);
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
    <div className='homepopular'>
      <div className="san-pham-section">
        <h2 className="san-pham-title">Sản phẩm ưu đãi nổi bật</h2>
        <p className="san-pham-subtitle">Học hết sức, sắm hết mình – giảm giá từ sách đến snack!</p>

        <div className="san-pham-grid-wrapper">
          <button className="prev-button" onClick={handlePrev}>&lt;</button>
          <div className="san-pham-grid" ref={productGridRef}>
            {all_product.map((item, i) => {
              return <Item key={i} _id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
          </div>
          <button className="next-button" onClick={handleNext}>&gt;</button>
        </div>
      </div>
      <section className="banner container1">
        <img src={bannerSale} alt="" />
      </section>
    </div>
  );
};

export default HomePopular;