import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import CollegeList from './CollegeList.js';
import AddCollege from './AddCollege.js';
import StudentList from './StudentList.js';
import AchievementList from './AchievementList.js';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        colleges: 0,
        students: 0,
        achievements: 0
    });
    const location = useLocation();

    useEffect(() => {
        // Simulating API call to get dashboard stats
        const fetchStats = async () => {
            // Replace this with actual API call
            const response = await new Promise(resolve => 
                setTimeout(() => resolve({
                    colleges: 15,
                    students: 1200,
                    achievements: 350
                }), 1000)
            );
            setStats(response);
        };

        fetchStats();
    }, []);

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h2>Admin Dashboard</h2>
                <div className="user-info">
                    <div className="user-avatar"></div>
                    <span>Admin User</span>
                </div>
            </header>
            <nav className="admin-nav">
                <Link to="/admin/colleges" className={location.pathname === '/admin/colleges' ? 'active' : ''}>Colleges</Link>
                <Link to="/admin/students" className={location.pathname === '/admin/students' ? 'active' : ''}>Students</Link>
                <Link to="/admin/achievements" className={location.pathname === '/admin/achievements' ? 'active' : ''}>Achievements</Link>
                <Link to="/admin/add-college" className={location.pathname === '/admin/add-college' ? 'active' : ''}>Add College</Link>
            </nav>
            <div className="admin-content">
                <div className="dashboard-stats">
                    <div className="stat-card">
                        <h3>Total Colleges</h3>
                        <p>{stats.colleges}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Students</h3>
                        <p>{stats.students}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Achievements</h3>
                        <p>{stats.achievements}</p>
                    </div>
                </div>
                <Routes>
                    <Route path="/admin/colleges" element={<CollegeList />} />
                    <Route path="/admin/students" element={<StudentList />} />
                    <Route path="/admin/achievements" element={<AchievementList />} />
                    <Route path="/admin/add-college" element={<AddCollege />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
