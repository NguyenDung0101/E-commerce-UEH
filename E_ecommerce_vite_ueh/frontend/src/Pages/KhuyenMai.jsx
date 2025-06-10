import React from 'react'
import style from "./CSS/ShopIntroduce/ShopIntroduce.module.css"
import './CSS/KhuyenMai/khuyenmai.css'
import SearchNew from '../Components/News/SearchNew/SearchNew'
import ShopNews from '../Components/News/ShopNews/ShopNews'

const KhuyenMai = ({ category }) => {
  return (
    <div className=''>
      <div className={style.news_header}>
        <h1 className={style.title}>Khuyến Mãi</h1>
        <div className={style.breadcrumb}>
          <h3 className={style.breadcrumb_1}>Trang chủ</h3>
          <i className="fa-solid fa-chevron-right"></i>
          <span className={style.breadcrumb_1}>Khuyễn Mãi</span>
        </div>
      </div>
      <div className="content-wrapperh">
        <SearchNew/>
        <ShopNews category={category} />
      </div>
    </div>
  )
}

export default KhuyenMai
