import React from 'react';
import { Link } from 'react-router-dom';
import Achievements from './StudentAchievements';
import Portfolio from './Portfolio';
import './StudentDashboard.css';

const StudentDashboard = () => {
    return (
        <div className="student-dashboard">
            <h2>Student Dashboard</h2>
            <nav>
                <Link to="/student/achievements">Achievements</Link>
                <Link to="/student/portfolio">Portfolio</Link>
            </nav>
            <div className="dashboard-content">
                <div className="achievements">
                    <Achievements />
                </div>
                <div className="portfolio">
                    <Portfolio />
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;