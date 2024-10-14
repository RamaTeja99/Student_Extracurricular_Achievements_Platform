import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import './CollegeDashboard.css';

const CollegeDashboard = () => {
    const location = useLocation();

    return (
        <div className="college-dashboard">
            <h2>College Dashboard</h2>
            <nav className="college-nav">
                <Link to="/college/dashboard/students" className={location.pathname === '/college/dashboard/students' ? 'active' : ''}>Students</Link>
                <Link to="/college/dashboard/add-student" className={location.pathname === '/college/dashboard/add-student' ? 'active' : ''}>Add Student</Link>
            </nav>
            <div className="route-container">
                <Outlet /> {/* This will render the matched child route */}
            </div>
        </div>
    );
};

export default CollegeDashboard;
