import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import CollegeDashboard from './components/College/CollegeDashboard';
import StudentDashboard from './components/Student/StudentDashboard';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/college/dashboard" element={<CollegeDashboard />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;