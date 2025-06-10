import React, { useContext, useState, useEffect } from "react";
import './Navbar.css';
import { Link, useNavigate } from "react-router-dom";
import logo from '../Assets/Logo_UEH_xanh.png';
import vector1 from '../Assets/Vector_1.png';
import vector3 from '../Assets/Vector_3.png';
import vector4 from '../Assets/Vector_4.png';
import vector5 from '../Assets/Vector_5.png';
import vector from '../Assets/Vector.png';
import { ShopContext } from "../../Context/ShopContext";
import { assets } from "../Assets/Assets_food/assets";
import { models } from "../Assets/image/image_project";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, token, setToken } = useContext(ShopContext);
  const [isProductsExpanded, setIsProductsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    window.location.reload()
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    document.body.style.overflow = isMobileMenuOpen ? "auto" : "hidden";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleProductsClick = () => {
    if (isMobile) {
      setIsProductsExpanded((prev) => !prev);
      setMenu("sanpham");
    }
  };

  return (
    <div className="navbar">
      <div className="navbar1">
        <div className="navbar1-contact">
          <div>
            <img src={vector} alt="" />
            <span>Hotline: 028 7306 1976</span>
          </div>
          <div className="email">
            <img src={vector1} alt="" />
            <span>Email: shop@ueh.edu.vn</span>
          </div>
        </div>
        <div className="promotion">
          <span>Khuyến Mãi Mùa Thu Giảm Giá</span>
          <span> 20%.</span>
        </div>
        <div className="navbar1-3">
          <img src={vector5} alt="" />
          <span>Tiếng Việt</span>
        </div>
      </div>

      <div className="navbar2">
        <div className="nav-logo">
          <Link to="/"><img onClick={() => setMenu("shop")} src={logo} alt="" /></Link>
        </div>
        <div className="nav-menu">
          <ul className={`nav-items ${isMobileMenuOpen ? "hidden" : "open"}`}>
            <li onClick={() => setMenu("shop")} className={menu === "shop" ? "active" : ""}>
              <Link to="/">Trang chủ</Link>
            </li>
            <li onClick={() => setMenu("gioithieu")} className={menu === "gioithieu" ? "active" : ""}>
              <Link to="/gioithieu">Giới thiệu</Link>
            </li>
            <li
              onClick={handleProductsClick}
              onMouseEnter={() => !isMobile && setIsProductsExpanded(true)}
              onMouseLeave={() => !isMobile && setIsProductsExpanded(false)}
              className={`has-dropdown ${menu === "has-dropdown" ? "active" : ""}`}
            >
              <div onClick={() => setMenu("has-sanpham")} className={menu === "has-sanpham" ? "active" : ""}>
                <Link to="/sanpham">Sản phẩm</Link>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
              {isProductsExpanded && (
                <ul className="dropdown-menu">
                  <li onClick={() => setMenu("has-sanpham")}><Link to="/uehfood">UEH Food</Link></li>
                  <hr />
                  <li onClick={() => setMenu("has-sanpham")}><Link to="/thoitrang">Thời trang</Link></li>
                  <hr />
                  <li onClick={() => setMenu("has-sanpham")}><Link to="/dungcu">Dụng cụ học tập</Link></li>
                  <hr />
                  <li onClick={() => setMenu("has-sanpham")}><Link to="/luuniem">Quà lưu niệm</Link></li>
                </ul>
              )}
            </li>
            <li onClick={() => setMenu("khuyenmai")} className={menu === "khuyenmai" ? "active" : ""}>
              <Link to="/khuyenmai">Khuyễn mãi</Link>
            </li>
            <li onClick={() => setMenu("tintuc")} className={menu === "tintuc" ? "active" : ""}>
              <Link to="/tintuc">Tin tức</Link>
            </li>
          </ul>

          {!token ? (
            <button onClick={() => setShowLogin(true)} className="px-3 py-2 mr-2 text-xs font-medium text-center text-black bg-[#D36F31] rounded-lg hover:bg-[#8c4b23]">
              Sign in
            </button>
          ) : (
            <div className="navbar-profile">
              <img className="navbar-profile-img" src="https://img.icons8.com/bubbles/100/000000/user.png" alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => { navigate('/profile'); setMenu("none1");}}><img src={models.icon_user} alt="" /><span>Thông tin</span></li>
                <hr />
                <li onClick={() => {navigate('/myorders'); setMenu("none1");}}><img src={assets.bag_icon} alt="" /><span>Đơn hàng</span></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" />Đăng xuất</li>
              </ul>
            </div>
          )}

          <div className="nav-icon">
            <Link to="/yeuthich"><img onClick={() => setMenu("none1")} src={vector3} alt="" /></Link>
            <Link to="/cart"><img onClick={() => setMenu("none1")} src={vector4} alt="" /></Link>
            <div className="nav-count2">{getTotalCartItems()}</div>
            <button onClick={toggleMobileMenu} className="icon-bar">
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && <div className="overlay" onClick={closeMobileMenu}></div>}

      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <button className="close-menu" onClick={closeMobileMenu}>&times;</button>
        <ul className="mobile-menu-items">
          <Link to="/"><li onClick={() => { setMenu("shop"); closeMobileMenu(); }}>Trang chủ</li></Link>
          <Link to="/gioithieu"><li onClick={() => { setMenu("tintuc"); closeMobileMenu(); }}>Giới thiệu</li></Link>
          <li>
            <div className="products-menu" onClick={() => setIsProductsExpanded(!isProductsExpanded)}>
              <span>Sản phẩm</span>
              <button className="expand-button">{isProductsExpanded ? "-" : "+"}</button>
            </div>
            {isProductsExpanded && (
              <ul className="sub-menu">
                <Link to="/uehfood"><li onClick={() => { setMenu("uehfood"); closeMobileMenu(); }}>UEH Food</li></Link>
                <Link to="/thoitrang"><li onClick={() => { setMenu("thoitrang"); closeMobileMenu(); }}>Thời Trang</li></Link>
                <Link to="/dungcu"><li onClick={() => { setMenu("dungcu"); closeMobileMenu(); }}>Dụng cụ học tập</li></Link>
                <Link to="/luuniem"><li onClick={() => { setMenu("luuniem"); closeMobileMenu(); }}>Quà lưu niệm</li></Link>
              </ul>
            )}
          </li>
          <Link to="/khuyenmai"><li onClick={() => { setMenu("khuyenmai"); closeMobileMenu(); }}>Khuyến mãi</li></Link>
          <Link to="/tintuc"><li onClick={() => { setMenu("tintuc"); closeMobileMenu(); }}>Tin tức</li></Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
