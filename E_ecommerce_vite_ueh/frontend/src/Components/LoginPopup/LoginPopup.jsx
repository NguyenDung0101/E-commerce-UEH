import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import cart_cross_icon from "../Assets/cart_cross_icon.png"
import { ShopContext } from '../../Context/ShopContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken } = useContext(ShopContext)

    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
    })

    const onChangHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false)
        }
        else {
            alert(response.data.message)
        }
    }

    useEffect(() => {
    }, [data])

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={cart_cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : (
                        <>
                            <input
                                onChange={onChangHandler}
                                name='name'
                                value={data.name}
                                type="text"
                                placeholder="Your name"
                                required
                            />
                            <input
                                onChange={onChangHandler}
                                name='phone'
                                value={data.phone}
                                type="text"
                                placeholder="Your phone number"
                                required
                            />
                            <input
                                onChange={onChangHandler}
                                name='dateOfBirth'
                                value={data.dateOfBirth}
                                type="date"
                                placeholder="Date of Birth"
                                required
                            />
                            <select
                                onChange={onChangHandler}
                                name='gender'
                                value={data.gender}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="nam">Nam</option>
                                <option value="nữ">Nữ</option>
                                <option value="khác">Khác</option>
                            </select>
                        </>
                    )}
                    <input name="email" type="email" onChange={onChangHandler} value={data.email} placeholder="Your email" required className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />
                    <input name="password" type="password" onChange={onChangHandler} value={data.password} placeholder="Password" required className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />
                </div>
                <button type='submit' >{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>

    )
}

export default LoginPopup