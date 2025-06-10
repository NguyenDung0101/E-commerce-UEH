import React from 'react'
import style2 from './CSS/ShopInformation/ShopInformation.module.css'
import './CSS/ShopInformation/ShopInformation.css'
import SearchNew from '../Components/News/SearchNew/SearchNew'
import InformationShop from '../Components/InformationShop/InformationShop'

const ShopInformation = () => {
  return (
    <div className='shopinformation'>
      <div className={style2.news_header}>
        <h1 className={style2.title}>Danh sách sản phẩm</h1>
        <div className={style2.breadcrumb}>
          <h3 className={style2.breadcrumb_1}>Trang chủ</h3>
          <i className="fa-solid fa-chevron-right"></i>
          <span className={style2.breadcrumb_1}>Giới thiệu chung</span>
        </div>
      </div>

      <div className="content-details">
        <SearchNew/>
        <InformationShop/>
      </div>
    </div>
  )
}

export default ShopInformation