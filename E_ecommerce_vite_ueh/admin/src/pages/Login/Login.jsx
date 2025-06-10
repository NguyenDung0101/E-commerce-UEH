import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            alert("Đăng nhập thành công!");
            localStorage.setItem('isLoggedIn', true);
            navigate('/user');
        } else {
            alert("Sai tài khoản hoặc mật khẩu");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Đăng Nhập</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Đăng Nhập</button>
                </form>
                <a href="/register" className="auth-link">Chưa có tài khoản? Đăng ký ngay</a>
            </div>
        </div>
    );
};

export default Login;
