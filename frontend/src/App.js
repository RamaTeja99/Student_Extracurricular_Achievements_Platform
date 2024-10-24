import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import CollegeDashboard from './components/College/CollegeDashboard';
import StudentDashboard from './components/Student/StudentDashboard';
import CollegeList from './components/Admin/Colleges/CollegeList';
import StudentList from './components/Admin/Students/StudentList';
import AddCollege from './components/Admin/Colleges/AddCollege';
import AchievementList from './components/Admin/Achievements/AchievementList';
import AddStudent from './components/College/Students/AddStudent';
import StudentListByCollege from './components/College/Students/StudentListByCollege';
import Achievements from './components/Student/StudentAchievements';
import Portfolio from './components/Student/Portfolio';
import EditCollege from './components/Admin/Colleges/EditCollege';
import AddAchievement from './components/College/Achievements/AddAchievement';
import EditAchievement from './components/College/Achievements/EditAchievement';
import StudentDetail from './components/College/Students/StudentDetail';
import EditStudent from './components/College/Students/EditStudent';

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
                    <Route path="edit-student" element={<EditStudent />} />
                    <Route path="add-achievement" element={<AddAchievement />} />
                    <Route path="edit-achievement" element={<EditAchievement />} />{}
                    <Route path="student-detail" element={<StudentDetail />} />
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