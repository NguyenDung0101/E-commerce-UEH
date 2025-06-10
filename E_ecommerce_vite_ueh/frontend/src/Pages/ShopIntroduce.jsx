import React from "react";
import style from "./CSS/ShopIntroduce/ShopIntroduce.module.css"
import './CSS/ShopIntroduce/ShopIntroduce.css'
import SearchNew from "../Components/News/SearchNew/SearchNew";
import ShopNews from "../Components/News/ShopNews/ShopNews";

const ShopIntroduce = ({ category }) => {
  return (
    <div className="shopintroduce">
      <div className={style.news_header}>
        <h1 className={style.title}>Tin tức</h1>
        <div className={style.breadcrumb}>
          <h3 className={style.breadcrumb_1}>Trang chủ</h3>
          <i className="fa-solid fa-chevron-right"></i>
          <span className={style.breadcrumb_1}>Tin tức</span>
        </div>
      </div>

      <div className="content-wrapper">
        <SearchNew/>
        <ShopNews category={category} />
      </div>
    </div>
  )
}

export default ShopIntroduce
