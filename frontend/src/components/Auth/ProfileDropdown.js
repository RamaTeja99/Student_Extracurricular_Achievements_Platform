import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getTokenInfo } from '../../utils/tokenUtils';
import Logout from './Logout';
import './ProfileDropdown.css';

const ProfileDropdown = ({ dashboardType }) => {
    const [isOpen, setIsOpen] = useState(false);
    const tokenInfo = getTokenInfo();
    
    // Get username from token and capitalize first letter
    const username = tokenInfo?.username || '';
    const initial = username.charAt(0).toUpperCase();
    const displayName = initial + username.slice(1);

    // Toggle dropdown on click
    const toggleDropdown = () => setIsOpen(prevState => !prevState);

    return (
        <div className={`profile-dropdown ${dashboardType}`}>
            <div className="profile-icon" onClick={toggleDropdown}>
                {initial}
            </div>
            {isOpen && (
                <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                    <div className={`${dashboardType}-name`}>{displayName}</div>
                    <Link to={`/${dashboardType}/edit-profile`} className="dropdown-item">Edit Profile</Link>
                    <Link to={`/${dashboardType}/settings`} className="dropdown-item">Settings</Link>
                    <Logout />
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
