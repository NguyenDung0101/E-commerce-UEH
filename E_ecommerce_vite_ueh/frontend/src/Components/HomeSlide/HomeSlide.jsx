import React, { useState } from 'react';
import './HomeSlide.css';
import banner1 from "../Assets/HomeComponents/banner1.png";
import banner1_2 from "../Assets/HomeComponents/banner1-2.jpg";
import banner1_3 from "../Assets/HomeComponents/banner1-3.jpg";
import banner2 from "../Assets/HomeComponents/banner2.png";
import banner3 from "../Assets/HomeComponents/banner3.png";
import icon1 from "../Assets/HomeComponents/icon-baner1.png";
import icon2 from "../Assets/HomeComponents/icon-baner2.png";
import icon3 from "../Assets/HomeComponents/icon-baner3.png";
import icon4 from "../Assets/HomeComponents/icon-baner4.png";

const HomeSlide = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const banners = [banner1, banner1_2, banner1_3];

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  return (
    <div className="homeslide">
      <div className="homslide-section1">
        <div id="controls-carousel" className="homeslide-left relative w-full" data-carousel="static"> {/* Chỉnh width ở đây */}
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            {banners.map((banner, index) => (
              <div
                key={index}
                className={`absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
                style={{ transition: 'opacity 0.5s ease-in-out' }}
              >
                <img src={banner} className="block w-full" alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>

          {/* Slider controls */}
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={handlePrev}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none z-0"
            onClick={handleNext}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
        <div className="homeslide-1">
          <img src={banner2} alt=" Banner Right 1" />
          <img src={banner3} alt=" Banner Right 2" />
        </div>
      </div>
      <div className="homeslide-section2">
        <div className="homeslide-icon">
          <img src={icon1} alt="" />
          <div className="homeslide-text">
            <p className='text1'>Chuyển phát thanh</p>
            <p>Tất cả các đơn hàng trên 1000k</p>
          </div>
        </div>
        <div className="homeslide-icon">
          <img src={icon2} alt="" />
          <div className="homeslide-text">
            <p className='text1'>Thanh Toán An Toàn</p>
            <p>Thanh Toán An Toàn 100%</p>
          </div>
        </div>
        <div className="homeslide-icon">
          <img src={icon3} alt="" />
          <div className="homeslide-text">
            <p className='text1'>Phiếu Giảm Giá</p>
            <p>Tận hưởng Khuyến mãi lớn</p>
          </div>
        </div>
        <div className="homeslide-icon">
          <img src={icon4} alt="" />
          <div className="homeslide-text">
            <p className='text1'>Hỗ Trợ Chất Lượng</p>
            <p>Hỗ Trợ Tận Tình 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSlide;
