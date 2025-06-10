import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from "react-toastify"

const List = ({url}) => {
  
  // State để lưu trữ danh sách sản phẩm
  const [list, setList] = useState([]);

  // Hàm lấy danh sách sản phẩm từ API
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/product/list`);
    if (response.data.success) {
      setList(response.data.data); // Cập nhật state list với dữ liệu sản phẩm nhận được
    } else {
      toast.error("Error"); // Hiển thị thông báo lỗi nếu không lấy được dữ liệu
    }
  }

  // Hàm xóa sản phẩm dựa trên productId
  const removeProduct = async (productId) => {
    const response = await axios.post(`${url}/api/product/remove`, { id: productId });
    await fetchList(); // Cập nhật lại danh sách sau khi xóa
    if (response.data.success) {
      toast.success(response.data.message); // Hiển thị thông báo thành công
    } else {
      toast.error("Error"); // Hiển thị thông báo lỗi nếu xóa thất bại
    }
  }

  // useEffect để gọi fetchList khi component được render lần đầu
  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>Danh sách sản phẩm</p>
      {/* Bảng hiển thị danh sách sản phẩm */}
      <div className="list-table">
        <div className="list-table-format title">
          <b>Ảnh</b>
          <b>Tên</b>
          <b>Loại sản phẩm</b>
          <b>Giá</b>
          <b>Số lượng đã bán</b>
          <b>Thao tác</b>
        </div>
        
        {/* Duyệt qua từng sản phẩm trong danh sách và hiển thị */}
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" /> {/* Ảnh sản phẩm */}
              <p>{item.name}</p> {/* Tên sản phẩm */}
              <p>{item.category}</p> {/* Loại sản phẩm */}
              <p>${item.new_price}</p> {/* Giá sản phẩm */}
              <p>{item.soldCount}</p> {/* Số lượng sản phẩm đã bán */}
              {/* Nút xóa sản phẩm */}
              <p onClick={() => { removeProduct(item._id) }} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
