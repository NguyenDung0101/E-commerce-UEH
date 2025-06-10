import React from 'react'
import './HomeIntroduce.css'

const HomeIntroduce = () => {
  const stats = [
    { number: '1976', label: 'Thành lập' },
    { number: '3', label: 'Trường thành viên' },
    { number: '12', label: 'Phòng/Ban' },
    { number: '16', label: 'Đơn vị khoa học, kinh doanh' },
    { number: '30.747', label: 'Quy mô sinh viên' },
  ];
  return (
    <div>
      <div className="gioi-thieu-section">
        <h2 className="gioi-thieu-title">Giới thiệu</h2>
        <p className="gioi-thieu-subtitle">Unbounded creativity. Empowered futures. Holistic values.</p>
        <p className="gioi-thieu-subtitle">Thỏa sức sáng tạo. Chủ động tương lai. Toàn diện giá trị.</p>

        <div className="gioi-thieu-stats">
          {stats.map((stat, index) => (
            <div key={index} className="gioi-thieu-stat-item">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeIntroduce