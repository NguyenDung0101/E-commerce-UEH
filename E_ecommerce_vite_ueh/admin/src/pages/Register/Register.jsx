import React, { useState } from 'react';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === username);
        if (userExists) {
            alert("Tên đăng nhập đã tồn tại! Vui lòng chọn tên khác.");
            return;
        }
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert("Đăng ký thành công!");
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Đăng Ký</h2>
                <form onSubmit={handleRegister}>
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
                    <button type="submit">Đăng Ký</button>
                </form>
                <a href="/login" className="auth-link">Đã có tài khoản? Đăng nhập</a>
            </div>
        </div>
    );
};

export default Register;
