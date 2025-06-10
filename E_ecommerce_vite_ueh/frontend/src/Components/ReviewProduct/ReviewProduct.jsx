import React, { useContext, useEffect, useState } from 'react';
import './ReviewProduct.css';
import { ShopContext } from '../../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const ReviewProduct = (props) => {
  const { product } = props;
  const { url } = useContext(ShopContext);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.get(`${url}/api/product/getcomment/${product._id}`);
        if (response.data.success) {
          setReviewsList(response.data.comments);
        }
      } catch (error) {
        toast.error("Không thể lấy danh sách bình luận.");
      }
    };
    if (product && product._id) fetchComment();
  }, [url, product]);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingClick = (star) => {
    setRating(star);
  };

  const handleReviewSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warn("Bạn cần đăng nhập để thêm bình luận.");
      return;
    }

    if (review.trim() && rating > 0) {
      try {
        const response = await axios.post(
          `${url}/api/product/addcomment`,
          {
            productId: product._id,
            commentText: review,
            rating: rating,
          },
          {
            headers: { token },
          }
        );

        if (response.data.success) {
          setReviewsList(response.data.comments);
          setReview('');
          setRating(0);
          setShowRatingForm(false);
          toast.success("Bình luận đã được thêm thành công!");
        } else {
          toast.error("Không thể thêm bình luận.");
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra khi gửi bình luận.");
        console.error(error);
      }
    } else {
      toast.warn("Vui lòng nhập nội dung bình luận và chọn số sao.");
    }
  };

  const ratingCounts = [0, 0, 0, 0, 0];
  reviewsList.forEach(cmt => {
    ratingCounts[cmt.rating - 1] += 1;
  });

  const averageRating = reviewsList.length > 0
    ? (reviewsList.reduce((acc, curr) => acc + curr.rating, 0) / reviewsList.length).toFixed(1)
    : 0;

  return (
    <div>
      <div className="rating-section">
        <h3>Khách hàng đánh giá</h3>
        <div className="rating-summary">
          <div className="rating-number">
            <span className="rating-score">{averageRating || 'Chưa có đánh giá'}</span>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{ color: star <= averageRating ? '#f4b400' : '#ccc' }} // Sử dụng averageRating đã tính
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="rating-details">
          <h4>Chi tiết đánh giá:</h4>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="rating-row">
              <span className="star-level">{star}★</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${(ratingCounts[star - 1] / reviewsList.length) * 100 || 0}%` }}></div>
              </div>
              <span className="percent">{ratingCounts[star - 1]} đánh giá</span>
            </div>
          ))}
        </div>

        <div className="rating-action">
          <p>Chia sẻ nhận xét về sản phẩm</p>
          <button className="review-button" onClick={() => setShowRatingForm(true)}>ĐÁNH GIÁ VÀ NHẬN XÉT</button>
        </div>
      </div>

      {showRatingForm && (
        <div className="review-section">
          <h3>Đánh giá sản phẩm</h3>
          <div className="rating-stars">
            <p>Chọn số sao:</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingClick(star)}
                style={{ cursor: 'pointer', color: star <= rating ? '#f4b400' : '#ccc' }}
              >
                ★
              </span>
            ))}
          </div>
          <div className="comment-box">
            <textarea
              value={review}
              onChange={handleReviewChange}
              placeholder="Viết nhận xét của bạn..."
            />
          </div>
          <div className="comment-tools">
            <button className="submit-button" onClick={handleReviewSubmit}>GỬI NHẬN XÉT</button>
          </div>
        </div>
      )}

      <div className="reviews-list">
        <h3>Nhận xét của khách hàng:</h3>
        {reviewsList.length > 0 ? (
          reviewsList.map((cmt, index) => (
            <div key={index} className="user-review">
              <div className="user-info">
                <img className="navbar-profile-img" src="https://img.icons8.com/bubbles/100/000000/user.png" alt="" />
                <div className="user-details">
                  <p className="user-name">{cmt.customerName}</p>
                  <p className="review-time">
                    {`${new Intl.DateTimeFormat('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    }).format(new Date(cmt.createdAt))}, ${new Intl.DateTimeFormat('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }).format(new Date(cmt.createdAt))}`}
                  </p>
                </div>
              </div>
              <div className="user-rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} style={{ color: star <= cmt.rating ? '#f4b400' : '#ccc' }}>
                      ★
                    </span>
                  ))}
                </div>
                <p>{cmt.commentText}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Không có bình luận nào.</p>
        )}
      </div>
    </div>
  );
}

export default ReviewProduct;
