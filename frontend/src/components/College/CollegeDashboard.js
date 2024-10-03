import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import StudentList from './StudentList.js';
import AddStudent from './AddStudent.js';
import './CollegeDashboard.css';

const CollegeDashboard = () => {
    return (
        <div className="college-dashboard">
            <h2>College Dashboard</h2>
            <nav>
                <Link to="/college/students">Students</Link>
                <Link to="/college/add-student">Add Student</Link>
            </nav>
            <div className="route-container">
                <Routes>
                    <Route path="/college/students" component={StudentList} />
                    <Route path="/college/add-student" component={AddStudent} />
                </Routes>
            </div>
        </div>
    );
};

export default CollegeDashboard;