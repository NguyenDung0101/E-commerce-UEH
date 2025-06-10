import React from 'react'
import './HomeNews.css'
import news_pagehome from '../Assets/image/news_home'
import News from '../News/News'

const HomeNews = () => {
  return (
    <div className='homenews'>
      <div className="tin-tuc-section">
        <h2 className="tin-tuc-title">Tin tức mới nhất</h2>
        <p className="tin-tuc-subtitle">Văn Phòng Phẩm Thiết Yếu Trong Cửa Hàng Văn Phòng Phẩm Trực Tuyến</p>

        <div className="tin-tuc-grid">
        {news_pagehome.map((item, i) => {
          return <News key= {i} id={item.id} name={item.name} image={item.image} date={item.date} details={item.details}/>
        })}
        </div>
      </div>
    </div>
  )
}

export default HomeNews