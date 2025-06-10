import React, { useContext, useState, useEffect } from "react";
import style from './CSS/ShopCategoryStyles/ShopCategory.module.css';
import './CSS/ShopCategoryStyles/ShopCategory.css';
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import { assets } from "../Components/Assets/Assets_food/assets";
import { models } from "../Components/Assets/image/image_project";
import { useNavigate, useLocation } from "react-router-dom";

const ShopCategory = () => {
  const { all_product } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Mặc định hiển thị "Tất cả" sản phẩm khi vào trang /sanpham lần đầu tiên
  useEffect(() => {
    if (location.pathname === "/sanpham" && selectedCategory === "") {
      handleCategoryClick(""); // Gọi hàm để hiển thị tất cả sản phẩm
    } else {
      const path = location.pathname.split("/")[1];
      setSelectedCategory(path || ""); // Cập nhật danh mục khi thay đổi URL
    }
  }, [location.pathname]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate(category ? `/${category}` : "/sanpham");
  };

  const filteredProducts = (selectedCategory ? all_product.filter(item => item.category === selectedCategory) : all_product)
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "name-asc") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "low-to-high") {
        return a.new_price - b.new_price;
      } else if (sortOption === "high-to-low") {
        return b.new_price - a.new_price;
      }
      return 0;
    });

  return (
    <div className='shop-category'>
      <div className={style.news_header}>
        <h1 className={style.title}>Danh sách sản phẩm</h1>
        <div className={style.breadcrumb}>
          <h3 className={style.breadcrumb_1}>Trang chủ</h3>
          <i className="fa-solid fa-chevron-right"></i>
          <span className={style.breadcrumb_1}>Danh sách sản phẩm</span>
        </div>
      </div>
      <h2>Mua sắm theo danh mục</h2>
      <div className="category-menu">
        <div className="menu-choice" onClick={() => handleCategoryClick("")}>
          <img src={models.uehshop} alt="ueh shop" className="rounded"/>
          <h6>Tất cả</h6>
        </div>
        <div className="menu-choice" onClick={() => handleCategoryClick("thoitrang")}>
          <img src={models.thoitrang} alt="Thời trang" className="rounded"/>
          <h6>Thời trang</h6>
        </div>
        <div className="menu-choice" onClick={() => handleCategoryClick("uehfood")}>
          <img src={models.uehfood} alt="UEH Food" className="rounded"/>
          <h6>UEH Food</h6>
        </div>
        <div className="menu-choice" onClick={() => handleCategoryClick("dungcu")}>
          <img src={assets.dungcu} alt="Dụng cụ học tập" className="rounded"/>
          <h6>Học tập</h6>
        </div>
        <div className="menu-choice" onClick={() => handleCategoryClick("luuniem")}>
          <img src={models.qualuuniem} alt="Quà lưu niệm" className="rounded"/>
          <h6>Quà lưu niệm</h6>
        </div>
      </div>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Tìm kiếm sản phẩm..." 
          value={searchTerm} 
          onChange={handleSearch} 
        />
      </div>

      <div className="filter">
        <div className="filter-item">
          <span className="orange-text">Hiển thị:</span>
        </div>
        <div className="filter-item">
          <span className="orange-text">Sắp xếp: </span>
          <select name="sort" id="sort" onChange={handleSortChange} value={sortOption}>
            <option value="">Mặc định</option>
            <option value="name-asc">Theo tên (A-Z)</option>
            <option value="low-to-high">Giá từ thấp đến cao</option>
            <option value="high-to-low">Giá từ cao đến thấp</option>
          </select>
        </div>
      </div>

      <div className="shopcategory-products">
        {filteredProducts.map((item) => (
          <Item 
            key={item._id} 
            _id={item._id} 
            name={item.name} 
            image={item.image} 
            new_price={item.new_price} 
            old_price={item.old_price} 
          />
        ))}
      </div>
    </div>
  );
}

export default ShopCategory;





