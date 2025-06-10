import React from 'react'
import './News.css'

const News = (props) => {
  return (
    <div className='news'>
      <div className="content-item">
        <img src={props.image} alt=''/>
        <div className="content-info">
          <h3>{props.name}</h3>
          <span><i className="fa-regular fa-calendar-check"></i>{props.date}</span>
          <p className='content-info-detail'>{props.details}</p>
        </div>
      </div>
    </div>
  )
}

export default News