import React, { useEffect, useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTokenInfo } from '../../utils/tokenUtils';
import ProfileDropdown from '../Auth/ProfileDropdown';
import ThemeToggle from '../ThemeToggle';
import IdleTimer from '../Auth/IdleTimer';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        colleges: 0,
        students: 0,
        achievements: 0,
    });
    const location = useLocation();
    const navigate = useNavigate();
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    useEffect(() => {
        // Simulating API call to get dashboard stats
        const fetchStats = async () => {
            const response = await new Promise((resolve) =>
                setTimeout(() => resolve({
                    colleges: 15,
                    students: 1200,
                    achievements: 350,
                }), 1000)
            );
            setStats(response);
        };

        fetchStats();

        const tokenInfo = getTokenInfo();
        if (!tokenInfo || tokenInfo.exp * 1000 <= Date.now()) {
            navigate('/login'); // Redirect to login if token is invalid
        }
    }, [navigate]);

    return (
        <div className={`admin-dashboard ${isDarkMode ? 'dark' : 'light'}`}>
            <IdleTimer />
            <header className="admin-header">
                <h2>Admin Dashboard</h2>
                <nav className="admin-nav">
                    <div className="nav-links">
                        <Link to="/admin/dashboard/colleges" className={location.pathname === '/admin/dashboard/colleges' ? 'active' : ''}>Colleges</Link>
                        <Link to="/admin/dashboard/students" className={location.pathname === '/admin/dashboard/students' ? 'active' : ''}>Students</Link>
                        <Link to="/admin/dashboard/achievements" className={location.pathname === '/admin/dashboard/achievements' ? 'active' : ''}>Achievements</Link>
                        <Link to="/admin/dashboard/add-college" className={location.pathname === '/admin/dashboard/add-college' ? 'active' : ''}>Add College</Link>
                    </div>
                    <div className="header-actions">
                        <ThemeToggle />
                        <ProfileDropdown dashboardType="admin" />
                    </div>
                </nav>
            </header>
            <div className="admin-content">
                <div className="dashboard-stats">
                    <StatCard title="Total Colleges" value={stats.colleges} />
                    <StatCard title="Total Students" value={stats.students} />
                    <StatCard title="Total Achievements" value={stats.achievements} />
                </div>
                <Outlet />
            </div>
        </div>
    );
};

const StatCard = ({ title, value }) => (
    <div className="stat-card">
        <h3>{title}</h3>
        <p>{value}</p>
    </div>
);

export default AdminDashboard;
