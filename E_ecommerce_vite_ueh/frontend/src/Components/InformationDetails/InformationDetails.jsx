import React from 'react'
import style from './InformationDetails.module.css'

const InformationDetails = () => {
  return (
    <div>
      <div className={style.news_header}>
        <h1 className={style.title}>Giới thiệu chung</h1>
        <div class={style.breadcrumb}>
          <h3 className={style.breadcrumb_1}>Trang chủ</h3> 
          <i className="fa-solid fa-chevron-right"></i>  
          <span className={style.breadcrumb_1}>Giới thiệu chung</span>
        </div>
      </div>
    </div>
  )
}

export default InformationDetails