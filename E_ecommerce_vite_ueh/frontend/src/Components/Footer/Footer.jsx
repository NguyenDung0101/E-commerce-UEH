import React from 'react'
import './Footer.css'
import ueh_logo from '../Assets/ueh_logo.png'

const Footer = () => {

  return (
    <div>
      <div className="footer-section">
        <div className="container">
          <div className="footer-top">
            <div className="footer-logo">
              <img src={ueh_logo} alt="UEH Logo" />
            </div>
            <span style={{ flex: 1 }}>Nhận thông báo</span>
            <div className="newsletter-foot">

              <input type="email" placeholder="Email" />
              <button type="submit">Gửi <i className="fa fa-arrow-right"></i></button>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Chính Sách</h4>
              <ul>
                <li><p>Điều khoản dịch vụ</p></li>
                <li><p>Bảo mật thông tin</p></li>
                <li><p>Chính sách nhà nước</p></li>
                <li><p>Cho người lao động</p></li>
                <li><p>Dành cho nhà tuyển dụng</p></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Liên Kết</h4>
              <ul>
                <li><p>Giới thiệu</p></li>
                <li><p>Tin tức mới</p></li>
                <li><p>Thông tin cần biết</p></li>
                <li><p>Câu hỏi thường gặp</p></li>
                <li><p>Hỗ trợ trực tuyến</p></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Sản Phẩm</h4>
              <ul>
                <li><p>UEH FOOD</p></li>
                <li><p>Thời trang</p></li>
                <li><p>Dụng cụ học tập</p></li>
                <li><p>Quà lưu niệm</p></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Thông Tin Liên Hệ</h4>
              <ul>
                <li>UEH CONVENIENCE STORE</li>
                <li>279 Nguyễn Tri Phương, P.5, Q.10, Tp.HCM (Tòa nhà B1)</li>
                <li>Điện thoại: 028 7306 1976</li>
                <li>Email: <a href="mailto:cvsstore@ueh.edu.vn">cvsstore@ueh.edu.vn</a></li>
              </ul>
              <div className="social-icons">
                <p><i className="fa-brands fa-facebook-f"></i></p>
                <p><i className="fa-brands fa-twitter"></i></p>
                <p><i className="fa-brands fa-google-plus-g"></i></p>
                <p><i className="fa-brands fa-instagram"></i></p>
                <p><i className="fa-brands fa-youtube"></i></p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Copyright © 2024 Web4s. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer