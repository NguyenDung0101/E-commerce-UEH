import React from 'react'
import './ShopNews.css'
import all_news from '../../Assets/image/news_details'
import News from '../News'

const ShopNews = (props) => {
  return (
    <div className='ShopNews'>
      <div className="filter-n">
        <div className="filter-item-n">
          <span className="orange-text-n">Hiển thị:</span>
        </div>
        <div className="filter-item-n">
          <span className="orange-text-n">Sắp xếp: </span>
          <select name="sort" id="sort">
            <option value="name-asc">Theo tên</option>
            <option value="low-to-high">Theo ngày</option>
            <option value="high-to-low">Theop tháng</option>
          </select>
        </div>
      </div>

      <div className="content-grid">
        {all_news.map((item, i) => {
          if (props.category === item.category) {
            return <div key={i}><News id={item.id} name={item.name} image={item.image} date={item.date} details={item.details}/></div>
          }
          return null; // Thêm dòng này để đảm bảo React không cảnh báo về giá trị trả về undefined
        })}
      </div>
    </div>
  )
}

export default ShopNews
