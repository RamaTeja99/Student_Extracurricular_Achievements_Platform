import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api';
import Background3D from './Background3D';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errors, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);

            if (response.status === 200 && response.data) {
                console.log('Login successful:', response.data);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('roleSpecificId', response.data.roleSpecificId);
                if (response.data.role === 'admin') {
                    navigate('/admin/dashboard');
                } else if (response.data.role === 'college') {
                    navigate('/college/dashboard');
                } else {
                    navigate('/student/dashboard');
                }
            }else {
                // Handle when no data is returned in the response
                console.error('No data returned in the response.');
                setError('No data received. Please try again.');
            }
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Login failed:', errors,error);
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
                        <button type="submit">Login</button>
                        
                    </form>
                </div>
            </div>
            <button onClick={() => navigate("/")} className="back-button">Back</button> {/* Back button */}
        </div>
    );
};

export default Login;
