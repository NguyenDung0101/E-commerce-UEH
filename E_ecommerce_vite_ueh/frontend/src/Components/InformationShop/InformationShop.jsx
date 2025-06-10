import React, { useState } from 'react';
import './InformationShop.css';

const InformationShop = () => {
  const [comment, setComment] = useState(''); // State for the input comment
  const [commentsList, setCommentsList] = useState([]); // State for list of comments

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim()) {
      setCommentsList([...commentsList, comment]); // Add new comment to commentsList
      setComment(''); // Clear input after submission
    } else {
      alert('Vui lòng nhập bình luận.');
    }
  };

  return (
    <div className='informationshop'>
      <div className="introduction">
        <h2>Giới thiệu chung</h2>
        <p className="date">13:47 - 17/07/2024</p>
        <p>UEH Convenience store là trang giao dịch bán hàng trực tuyến vì cộng đồng trực thuộc Đại học Kinh tế TP. Hồ Chí Minh (UEH), ra đời từ tháng 9 năm 2024, nhằm khẳng định định hướng hiện đại, hội nhập, và tinh thần sáng tạo của nhà trường. UEH Convenience store cung cấp đa dạng các sản phẩm từ quà lưu niệm, sách giáo trình, tài liệu tham khảo đến các sản phẩm khởi nghiệp đổi mới sáng tạo của sinh viên, cựu sinh viên.</p>
        <p>Cửa hàng cung cấp ba nhóm sản phẩm độc quyền: Quà lưu niệm UEH, Nhà sách UEH, và Inno Shop, với hàng trăm sản phẩm chất lượng, thể hiện rõ dấu ấn thương hiệu UEH. Ngoài ra, cửa hàng cũng chú trọng đến thông điệp sống xanh, bền vững mà UEH đang hướng tới trong cả không gian học tập và đời sống.</p>
        <p>Đặc biệt, UEH Community Shop còn cung cấp các mặt hàng thực phẩm phục vụ nhu cầu ăn uống. Các sản phẩm này bao gồm thức ăn nhẹ, đồ uống bổ dưỡng, đảm bảo an toàn vệ sinh thực phẩm, giúp phục vụ sinh viên, giảng viên và các khách hàng khác trong quá trình học tập và làm việc tại trường. Việc kinh doanh thực phẩm không chỉ hướng đến đáp ứng nhu cầu cơ bản mà còn góp phần lan tỏa lối sống lành mạnh và bền vững trong cộng đồng.</p>
        <p>Với tinh thần khởi nghiệp và đổi mới sáng tạo, các sản phẩm từ Inno Shop sẽ giúp sinh viên và cựu sinh viên có cơ hội đến gần hơn với người tiêu dùng, góp phần lan tỏa mạnh mẽ tinh thần khởi nghiệp trong xã hội.</p>
        <p className="rating">Chia sẻ:</p>
        <div className="icon-contact">
          <p><i className="fa-brands fa-facebook-f"></i></p>
          <p><i className="fa-brands fa-twitter"></i></p>
          <p><i className="fa-brands fa-google-plus-g"></i></p>
          <p><i className="fa-brands fa-instagram"></i></p>
          <p><i className="fa-brands fa-youtube"></i></p>
        </div>
      </div>
      
      <div className="comment-container">
        <h3>Bình luận</h3>
        <div className="comment-input-wrapper">
          <textarea
            className="comment-input"
            value={comment}
            onChange={handleInputChange}
            placeholder="Nhập bình luận của bạn..."
          />
          <button className="upload-button">
            <i className="fa fa-camera"></i> {/* Icon camera */}
          </button>
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          Gửi bình luận
        </button>
      </div>

      {/* Display submitted comments */}
      <div className="comments-list">
        <h3>Bình luận của khách hàng:</h3>
        {commentsList.map((cmt, index) => (
          <div key={index} className="user-comment">
            <div className="user-info">
              <div className="user-avatar">LĐ</div>
              <div className="user-details">
                <p className="user-name">Khách hàng {index + 1}</p>
                <p className="review-time">Vừa xong</p>
              </div>
            </div>
            <p>{cmt}</p>
          </div>
        ))}
      </div>

      <div className="related-posts">
        <h3>Bài viết khác</h3>
        <ul>
          <li><p>Sách lãi chỉ tiêu thiết yếu trong cuộc sống</p></li>
          <li><p>Cách tạo hình ảnh: Thước lý là công cụ thiết yếu</p></li>
          <li><p>Bản lâm viên gọn gàng, cách làm một ngược</p></li>
          <li><p>Bài viết: Khám phá nền tảng mới</p></li>
          <li><p>Mẹo làm việc đơn giản bằng văn phòng hoặc văn phòng nhỏ của bạn</p></li>
        </ul>
      </div>
    </div>
  );
};

export default InformationShop;
