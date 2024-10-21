import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import CollegeDashboard from './components/College/CollegeDashboard';
import StudentDashboard from './components/Student/StudentDashboard';
import CollegeList from './components/Admin/CollegeList';
import StudentList from './components/Admin/StudentList';
import AddCollege from './components/Admin/AddCollege';
import AchievementList from './components/Admin/AchievementList';
import AddStudent from './components/College/AddStudent';
import StudentListByCollege from './components/College/StudentListByCollege';
import Achievements from './components/Student/StudentAchievements';
import Portfolio from './components/Student/Portfolio';
import EditCollege from './components/Admin/EditCollege';
import AddAchievement from './components/College/AddAchievement';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/dashboard/*" element={<AdminDashboard />}>
                    <Route path="colleges" element={<CollegeList />} />
                    <Route path="students" element={<StudentList />} />
                    <Route path="achievements" element={<AchievementList />} />
                    <Route path="add-college" element={<AddCollege />} />
                    <Route path="edit-college" element={<EditCollege />} />
                </Route>
                <Route path="/college/dashboard/*" element={<CollegeDashboard />} >
                    <Route path="students" element={<StudentListByCollege />} />
                    <Route path="add-student" element={<AddStudent />} />
                    <Route path="add-achievement" element={<AddAchievement />} />
                </Route>
                <Route path="/student/dashboard/*" element={<StudentDashboard />}>
                    <Route path="achievements" element={<Achievements />} />
                    <Route path="portfolio" element={<Portfolio />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;