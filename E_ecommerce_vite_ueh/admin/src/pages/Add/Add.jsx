import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  // State lưu trữ tệp ảnh do người dùng chọn
  const [image, setImage] = useState(false);
  
  // State lưu trữ thông tin sản phẩm do người dùng nhập
  const [data, setData] = useState({
    name: "",
    description: "",
    old_price: "",
    new_price: "",
    category: "uehfood", // Danh mục mặc định
    brand: "",
    weight: "",
    specifications: "",
    color: ""
  });

  // Hàm xử lý thay đổi trong các trường nhập liệu và cập nhật state
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  // Hàm xử lý khi gửi form
  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    
    // Tạo đối tượng FormData để chứa cả các trường văn bản và tệp ảnh
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("old_price", Number(data.old_price)); // Chuyển đổi thành số
    formData.append("new_price", Number(data.new_price));
    formData.append("category", data.category);
    formData.append("image", image); // Thêm tệp ảnh vào FormData

    // Thêm các thuộc tính bổ sung vào FormData
    formData.append("brand", data.brand);
    formData.append("weight", data.weight);
    formData.append("specifications", data.specifications);
    formData.append("color", data.color);

    // Gửi yêu cầu POST để thêm sản phẩm
    const response = await axios.post(`${url}/api/product/add`, formData);
    if (response.data.success) {
      // Reset các trường dữ liệu sau khi thêm thành công
      setData({
        name: "",
        description: "",
        old_price: "",
        new_price: "",
        category: "uehfood",
        brand: "",
        weight: "",
        specifications: "",
        color: ""
      });
      setImage(false); // Reset tệp ảnh
      toast.success(response.data.message); // Hiển thị thông báo thành công
    } else {
      toast.error(response.data.message); // Hiển thị thông báo lỗi nếu thất bại
    }
  };

  return (
    <div className="add">
      {/* Form để thêm sản phẩm mới */}
      <form className="flex-col" onSubmit={onSubmitHandler}>
        
        {/* Khu vực tải ảnh sản phẩm */}
        <div className="add-img-upload flex-col">
          <p>Đăng ảnh</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>

        {/* Trường nhập tên sản phẩm */}
        <div className="add-product-name flex-col">
          <p>Tên sản phẩm</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
        </div>

        {/* Textarea để nhập miêu tả sản phẩm */}
        <div className="add-product-description flex-col">
          <p>Miêu tả sản phẩm</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write content here" required></textarea>
        </div>

        {/* Khu vực chọn danh mục và giá sản phẩm */}
        <div className="add-category-price">
          {/* Dropdown để chọn danh mục sản phẩm */}
          <div className="add-category flex-col">
            <p>Danh mục sản phẩm</p>
            <select name="category" value={data.category} onChange={onChangeHandler}>
              <option value="uehfood">UEH Food</option>
              <option value="thoitrang">Thời Trang</option>
              <option value="dungcu">Dụng cụ học tập</option>
              <option value="luuniem">Quà lưu niệm</option>
            </select>
          </div>
          
          {/* Trường nhập giá ban đầu và giá sau khi giảm */}
          <div className="add-price flex-col">
            <p>Giá ban đầu</p>
            <input onChange={onChangeHandler} value={data.old_price} type="number" name="old_price" placeholder="20,000 VNĐ" />
            <p>Sau lần giảm giá</p>
            <input onChange={onChangeHandler} value={data.new_price} type="number" name="new_price" placeholder="20,000 VNĐ" />
          </div>
        </div>
        
        {/* Các trường bổ sung cho thông số kỹ thuật của sản phẩm */}
        <div className="add-technical-specifications">
          <div className="add-product-name flex-col">
            <p>Thương hiệu</p>
            <input onChange={onChangeHandler} value={data.brand} type="text" name="brand" placeholder="UEH Shop" />
          </div>
          <div className="add-product-name flex-col">
            <p>Trọng lượng</p>
            <input onChange={onChangeHandler} value={data.weight} type="text" name="weight" placeholder="200g" />
          </div>
          <div className="add-product-name flex-col">
            <p>Quy cách</p>
            <input onChange={onChangeHandler} value={data.specifications} type="text" name="specifications" placeholder="Đóng gói" />
          </div>
          <div className="add-product-name flex-col">
            <p>Màu sắc</p>
            <input onChange={onChangeHandler} value={data.color} type="text" name="color" placeholder="Vàng nhạt" />
          </div>
        </div>

        {/* Nút để gửi yêu cầu thêm sản phẩm */}
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;
