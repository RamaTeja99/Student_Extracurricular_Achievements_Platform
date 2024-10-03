import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api';
import Background3D from './Background3D';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); // Store selected role
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password, role);
            if (response.status === 200 && response.data) {
                localStorage.setItem('role', response.data.role);
                if (response.data.role === 'ADMIN') {
                    navigate('/admin');
                } else if (response.data.role === 'COLLEGE') {
                    navigate('/college');
                } else {
                    navigate('/student');
                }
            }else {
                // Handle when no data is returned in the response
                console.error('No data returned in the response.');
                setError('No data received. Please try again.');
            }
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <Background3D />
            <div className="login-box-wrapper">
                <div className="login-box">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <select value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="">Select Role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="COLLEGE">College</option>
                            <option value="STUDENT">Student</option>
                        </select>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
