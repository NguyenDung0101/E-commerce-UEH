import React, { useState } from 'react';
import './HomeReview.css';
const testimonials = [
  {
    title: "GIAO DIỆN THÂN THIỆN",
    content: "Website của UEH Shop có giao diện rất thân thiện với người dùng, dễ dàng tìm kiếm sản phẩm và đặt hàng. Tôi rất hài lòng!",
    name: "Nguyễn Minh Anh",
    role: "Sinh viên UEH",
    image: "https://decofuni.vn/wp-content/uploads/485-anh-gai-xinh-cute-kham-pha-va-nguon-tai-nguyen-chat-luongimg_66e72fa66e238.jpg"
  },
  {
    title: "DỊCH VỤ TUYỆT VỜI",
    content: "Dịch vụ chăm sóc khách hàng của UEH Shop rất tận tâm và nhanh chóng. Tôi nhận được sự hỗ trợ kịp thời khi cần.",
    name: "Trần Văn Nam",
    role: "Sinh viên UEH",
    image: "https://antimatter.vn/wp-content/uploads/2022/10/hinh-anh-gai-xinh-de-thuong.jpg"
  },
  {
    title: "SẢN PHẨM CHẤT LƯỢNG",
    content: "Các sản phẩm trên UEH Shop đa dạng và chất lượng tốt. Tôi cảm thấy an tâm khi mua sắm tại đây.",
    name: "Lê Thị Thu Hà",
    role: "Sinh viên UEH",
    image: "https://cly.1cdn.vn/2022/08/04/bvcl.1cdn.vn-2022-08-03-_s1.media.ngoisao.vn-resize_580-news-2022-08-03-_29-ngoisaovn-w660-h973.jpg"
  }
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="testimonial-container">
      <h2 className="testimonial-title">ĐÁNH GIÁ TỪ SINH VIÊN UEH VỀ UEH SHOP</h2>
      <div className="testimonial-carousel">
        <button onClick={handlePrev} className="testimonial-nav-button">◀</button>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`testimonial-card ${index === currentIndex ? 'active' : 'inactive'}`}
          >
            <h3 className="testimonial-heading">{testimonial.title}</h3>
            <p className="testimonial-content">{testimonial.content}</p>
            <div className="testimonial-footer">
              <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
              <div>
                <p className="testimonial-name">{testimonial.name}</p>
                <p className="testimonial-role">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
        <button onClick={handleNext} className="testimonial-nav-button">▶</button>
      </div>
      <div className="testimonial-indicators">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;