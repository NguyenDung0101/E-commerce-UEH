import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Footer from './Components/Footer/Footer';
import ShopInformation from './Pages/ShopInformation';
import ShopIntroduce from './Pages/ShopIntroduce';
import Contact from './Pages/Contact';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import PlaceOrder from './Pages/PlaceOrder';
import Verify from './Pages/Verify';
import MyOrders from './Pages/MyOrders';
import 'react-toastify/dist/ReactToastify.css';
import ProfileUser from './Pages/ProfileUser';
import ShopLike from './Pages/ShopLike';
import ProfileEditUser from './Pages/ProfileEditUser';
import KhuyenMai from './Pages/KhuyenMai';




const App = () => {
  const [showLogin, setShowLogin]= useState(false)
  return (
    <div>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <Navbar setShowLogin= {setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sanpham' element={<ShopCategory/>}/>
        <Route path='/thoitrang' element={<ShopCategory category="thoitrang"/>}/>
        <Route path='/uehfood' element={<ShopCategory category="uehfood"/>}/>
        <Route path='/dungcu' element={<ShopCategory category="dungcu"/>}/>
        <Route path='/luuniem' element={<ShopCategory category="luuniem"/>}/>
        <Route path='/yeuthich' element={<ShopLike/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/gioithieu' element={<ShopInformation/>}/>
        <Route path='/khuyenmai' element={<KhuyenMai category="khuyenmai"/>}/>
        <Route path='/tintuc' element={<ShopIntroduce category="tintuc"/>}/>
        <Route path='/lienhe' element={<Contact/>}/>
        <Route path='/taikhoan' element={<LoginSignup/>}/>
        <Route path='/profile' element={<ProfileUser/>}/>
        <Route path='//edit-profile' element={<ProfileEditUser/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>} />
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App