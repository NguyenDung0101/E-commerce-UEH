import React from 'react'
import './DescriptionBox.css'

export const DescriptionBox = (props) => {
  const { product } = props;

  return (
    <div className='descriotionbox'>
      <div className="tabs">
        <div className="tab active">Thông tin sản phẩm</div>
        <div className="tab">Đánh giá</div>
        <div className="tab">Bình luận</div>
      </div>
      <div className="specifications">
        <h3>Thông số kĩ thuật:</h3>
        <table>
          <tbody>
            <tr>
              <td>Thương hiệu</td>
              <td>{product.brand}</td>
            </tr>
            <tr>
              <td>Trọng lượng</td>
              <td>{product.weight}</td>
            </tr>
            <tr>
              <td>Quy cách</td>
              <td>{product.specifications}</td>
            </tr>
            <tr>
              <td>Màu sắc</td>
              <td>{product.color}</td>
            </tr>
          </tbody>

        </table>
        {/* <div className="product-details">
          <h3>Tính năng nổi bật:</h3>
          <p>Kéo học sinh có nắp đậy Điểm 10 TP-SC01 phù hợp cho học sinh, sinh viên, văn phòng và gia đình. Kiểu dáng trang nhã, màu sắc xanh năng động.</p>
          <p><strong>Công dụng:</strong> Dùng để cắt giấy.</p>
          <p><strong>Kích thước:</strong> 15.5 cm</p>

          <h3>Đặc điểm nổi bật:</h3>
          <p>Kéo học sinh Loại kéo nhỏ dành cho học sinh làm thủ công, được làm bằng kim loại không gỉ, mũi kéo tròn để bảo vệ an toàn cho trẻ khi sử dụng. Tay cầm bằng nhựa giúp cắt nhẹ nhàng, không đau tay. hai lưỡi đồng được giữ áp sát vào nhau một cách linh hoạt nhằm để giữ hai lưỡi kéo tại đúng vị trí, cho phép chúng được ép sát lại với nhau.</p>
          <ul>
            <li>Lưỡi kéo sắc bén đầu bo tròn</li>
            <li>Kéo có nắp đậy không gây nguy hiểm cho người sử dụng</li>
            <li>Tay cầm có móc cài tiện lợi</li>
          </ul>
        </div> */}
      </div>
    </div>
  )
}

export default DescriptionBox
