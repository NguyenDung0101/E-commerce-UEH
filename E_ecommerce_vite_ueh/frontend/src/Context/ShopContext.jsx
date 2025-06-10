import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Tạo một context để chia sẻ thông tin giỏ hàng và sản phẩm
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  // URL của API backend
  const url = "http://localhost:4000";

  // Các state chính
  const [token, setToken] = useState("");
  const [all_product, setProductList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [favItems, setFavItems] = useState([]);

  // ShopLike.jsx
  // Hàm xử lý danh sách yêu thích
  const addToFavorites = async (itemId) => {
    setFavItems((prev) => ({ ...prev, [itemId]: prev[itemId] ? 0 : 1 }));
    console.log(favItems);  // In ra giỏ hàng hiện tại (có thể không phản ánh giá trị mới ngay do bất đồng bộ)
    console.log(favItems[itemId]);
    if (token) {
      await axios.post(`${url}/api/product/addfavorite`, { itemId }, { headers: { token } });
    }
  };

  const loadFavData = async (token) => {
    const response = await axios.post(`${url}/api/product/getfavorite`, {}, { headers: { token } });
    setFavItems(response.data.favData);
  };

  // Cart.jsx, ProductDisplay.jsx
  // Hàm xử lý giỏ hàng
  const addToCart = async (itemId, quantity = 1) => {
    if (!itemId) {
      console.error("Item ID is undefined or null");
      return;
    }
  
    // Thêm hoặc cập nhật số lượng sản phẩm dựa vào `quantity`
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + quantity, // Cộng thêm số lượng đã chọn
    }));
  
    console.log("Cart Items:", cartItems); // In ra giỏ hàng hiện tại
  
    // Gửi yêu cầu cập nhật giỏ hàng lên backend nếu có token
    if (token) {
      await axios.post(`${url}/api/cart/add`, { itemId, quantity }, { headers: { token } });
    }
  };
  

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
    }
  };

  // Hàm tính tổng số tiền của các sản phẩm có trong giỏ hàng.
  const getTotalAmount = () => {
    let totalAmount = 0;
    // Duyệt qua từng sản phẩm trong giỏ hàng
    for (const item in cartItems) {
      if (cartItems[item] > 0) {  // Nếu số lượng sản phẩm > 0
        let itemInfo = all_product.find((product) => product._id === item)  // Tìm sản phẩm tương ứng trong danh sách
        // Kiểm tra nếu sản phẩm tồn tại
        totalAmount += itemInfo.new_price * cartItems[item];  // Cộng dồn giá sản phẩm vào tổng số tiền

      }
    }
    return totalAmount;  // Trả về tổng số tiền của giỏ hàng
  }

  // Hàm tính tổng số lượng sản phẩm có trong giỏ hàng.
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {  // Nếu sản phẩm có số lượng lớn hơn 0
        totalItem += cartItems[item];  // Cộng dồn số lượng sản phẩm vào tổng
      }
    }
    return totalItem;  // Trả về tổng số sản phẩm trong giỏ
  }

  const loadCartData = async (token) => {
    const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
    setCartItems(response.data.cartData);
  };

  // ShopCategory.jsx
  // Hàm tải danh sách sản phẩm từ API
  const fetchProductList = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`);
      setProductList(response.data.data);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  

  // Tải dữ liệu ban đầu khi component được render lần đầu tiên
  useEffect(() => {
    console.log("Fetching product list...");
    async function loadData() {
      await fetchProductList(); 
      if (localStorage.getItem("token")) { 
        setToken(localStorage.getItem("token"));  
        await loadCartData(localStorage.getItem("token"));
        await loadFavData(localStorage.getItem("token"));
      }
    }
    loadData(); 
  }, []) 

  // Object chứa tất cả các state và hàm cần thiết để chia sẻ với các component khác
  const contextValue = {
    all_product,
    url,
    cartItems,
    addToFavorites,
    addToCart,
    removeFromCart,
    getTotalAmount,
    getTotalCartItems,
    setCartItems,
    favItems,
    token,
    setToken,
  };

  // Trả về ShopContext.Provider để chia sẻ giá trị của contextValue với các component con
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
