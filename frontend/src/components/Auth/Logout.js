import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api'; 

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout(); 
            sessionStorage.removeItem('role'); 
            sessionStorage.removeItem('roleSpecificId'); 
            navigate('/login'); 
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default Logout;
