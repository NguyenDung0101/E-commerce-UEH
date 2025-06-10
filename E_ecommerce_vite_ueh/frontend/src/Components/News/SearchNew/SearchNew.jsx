import React from 'react'
import './SearchNew.css'
import news1 from '../../Assets/image/news1.jpg'
import news2 from '../../Assets/image/news2.jpg'
import news3 from '../../Assets/image/news3.png'

const SearchNew = () => {
  return (
    <div className='SearchNew'>
      <div className="sidebar">
        <h3 className="search-title">Tìm kiếm</h3>
        <div className="search-box">
          <input className='input_1' type="text" placeholder="Từ khóa tìm kiếm" />
          <button className='btn_1' type="submit"><i className="fa fa-search"></i></button>
        </div>

        <h3 className="category-title">Danh Mục</h3>
        <ul className="category-list">
          <li><p >Giới thiệu</p></li>
          <li><p >Tin tức</p></li>
          <li><p >Khuyến mại</p></li>
          <li><p >Tuyển dụng</p></li>
          <li><p >Thư viện ảnh</p></li>
          <li><p >Thư viện video</p></li>
        </ul>

        <h3 className="recent-posts-title">Bài vừa đăng</h3>
        <ul className="recent-posts-list">
          <li>
            <img src={news1} alt="" className="post-image" />
            <div className="post-content">
              <p >Khuyến mãi tháng 9</p>
              <span><i className="fa-regular fa-calendar-check"></i> 10 tháng 09, 2024</span>
            </div>
          </li>
          <li>
            <img src={news2} alt="" className="post-image" />
            <div className="post-content">
              <p >Tết Nguyên đán 2024</p>
              <span><i className="fa-regular fa-calendar-check"></i>  17 tháng 07, 2024</span>
            </div>
          </li>
          <li>
            <img src={news3} alt="" className="post-image" />
            <div className="post-content">
              <p >UEH Community Shop</p>
              <span><i className="fa-regular fa-calendar-check"></i>  17 tháng 07, 2024</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SearchNew