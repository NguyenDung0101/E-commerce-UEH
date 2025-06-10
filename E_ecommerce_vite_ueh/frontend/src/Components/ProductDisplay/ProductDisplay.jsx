import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart, url, addToFavorites, all_product } = useContext(ShopContext);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái để kiểm soát modal

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleMouseMove = (e) => {
    const { top, left, width, height } = e.target.getBoundingClientRect();
    // Calculate the mouse position within the image, constrained between 0 and 100%
    const x = Math.max(0, Math.min(((e.clientX - left) / width) * 100, 100));
    const y = Math.max(0, Math.min(((e.clientY - top) / height) * 100, 100));
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);
  // Hàm để mở và đóng modal
  const handleImageClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);


  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div
          className="productdisplay-img"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onClick={handleImageClick} // Sự kiện khi click vào ảnh để mở modal
        >
          {product.image && (
            <img className="productdisplay-main-img" src={`${url}/images/${product.image}`} alt={product.name} />
          )}
          {isZoomed && (
            <div
              className="zoom-lens"
              style={{
                top: `calc(${zoomPosition.y}% - 75px)`,  // Center the lens vertically relative to the mouse
                left: `calc(${zoomPosition.x}% - 75px )`, // Center the lens horizontally relative to the mouse
                backgroundImage: `url(${url}/images/${product.image})`,
                backgroundPosition: `${zoomPosition.x * 1}% ${zoomPosition.y * 1}%`,
                backgroundSize: '500%', // Adjust zoom level
              }}
            ></div>
          )}
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{ color: star <= (product.averageRating || 0) ? '#f4b400' : '#ccc' }}
              >
                ★
              </span>
            ))}
          </div>
          <span>{product.averageRating || '0'}</span>
          <span>({product.reviewCount} Đánh giá)</span>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">{product.old_price?.toLocaleString()},000 VNĐ</div>
          <div className="productdisplay-right-price-new">{product.new_price?.toLocaleString()},000 VNĐ</div>
        </div>

        <div className="productdisplay-right-description">{product.description}</div>

        <div className="productdisplay-right-size">
          {product.category === "thoitrang" && (
            <div>
              <h1>Select Size</h1>
              <div className="productdisplay-right-sizes">
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>
              </div>
            </div>
          )}




          <div className="productdisplay-right-button">
            <div className="counter-container">
              <div className="counter-display">
                <span>{quantity}</span>
              </div>
              <div className="counter-buttons">
                <button onClick={handleIncrement}>+</button>
                <button onClick={handleDecrement}>-</button>
              </div>
            </div>
            <button className="add-to-cart" onClick={() => addToCart(product._id, quantity)}>
              THÊM GIỎ HÀNG
            </button>
            <div onClick={() => addToFavorites(product._id)} className="heart">
              <i className="fa-regular fa-heart"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Modal để hiển thị ảnh phóng to */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={`${url}/images/${product.image}`} alt={product.name} className="enlarged-image" />
            <button className="close-button" onClick={handleCloseModal}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;
