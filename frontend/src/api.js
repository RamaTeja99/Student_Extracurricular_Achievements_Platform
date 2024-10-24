import axios from 'axios';
import { exp } from 'three/webgpu';

const API_URL = 'http://localhost:8080/api'; // Adjust according to your backend URL

// Authentication API
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { username, password });
        return response;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axios.post(`${API_URL}/auth/logout`);
        return response;
    } catch (error) {
        console.error('API error during logout:', error);
        throw error;
    }
};

// Admin APIs
export const getColleges = async () => {
    return await axios.get(`${API_URL}/admin/colleges`);
};

export const getCollegeById = async (collegeId) => {
    return await axios.get(`${API_URL}/admin/colleges/${collegeId}`);
};

export const getCollegeUserByCollegeId = async (collegeId) => {
    return await axios.get(`${API_URL}/admin/college-user/${collegeId}`);
};

export const addCollege = async (college) => {
    return await axios.post(`${API_URL}/admin/colleges`, college);
};

export const addCollegeUser = async (user) => {
    return await axios.post(`${API_URL}/admin/addcollegeuser`, user);
};

export const updateCollege = async (collegeId, college) => {
    return await axios.put(`${API_URL}/admin/colleges/${collegeId}`, college);
};

// Update college credentials by collegeId
export const updateCollegeCredentials = async (collegeId, newUsername, newPassword) => {
    return await axios.put(`${API_URL}/admin/update-college-credentials/${collegeId}`, null, {
        params: {
            newUsername,
            newPassword,
        },
    });
};

export const deleteCollege = async (id) => {
    return await axios.delete(`${API_URL}/admin/colleges/${id}`);
};

export const deleteCollegeUser = async (id) => {
    return await axios.delete(`${API_URL}/admin/collegesuser/${id}`);
}


export const getAllAchievements = async () => {
    return await axios.get(`${API_URL}/admin/achievements`);
};
export const getStudents = async () => {
    return await axios.get(`${API_URL}/admin/students`);
};

// College APIs
export const getStudentsByCollege = async () => {
    let collegeId =null;
    if(sessionStorage.getItem('role') === 'college') {
        collegeId = sessionStorage.getItem('roleSpecificId');
    }
    return await axios.get(`${API_URL}/colleges/${collegeId}/students`);
};

export const addStudent = async (student) => {
    const collegeId = sessionStorage.getItem('roleSpecificId');
    return await axios.post(`${API_URL}/colleges/${collegeId}/students`, student);
};

export const addStudentUser = async (user) => {
    return await axios.post(`${API_URL}/colleges/addstudentuser`, user);
};

export const addAchievement = async (rollNumber, achievement) => {
    return await axios.post(`${API_URL}/colleges/students/${rollNumber}/achievements/add`, achievement); // Corrected line
};
export const getAchievementsByStudent = async (rollNumber) => {
    return await axios.get(`${API_URL}/colleges/students/${rollNumber}/achievements`);
};
export const updateStudent = async (id, student) => {
    return await axios.put(`${API_URL}/colleges/students/${id}`, student);
};

export const deleteStudent = async (id) => {
    return await axios.delete(`${API_URL}/colleges/students/${id}`);
};
export const deleteStudentUser = async (id) => {
    return await axios.delete(`${API_URL}/colleges/studentsuser/${id}`);
}
// Update an achievement by ID
export const updateAchievement = async (achievementId, updatedAchievement) => {
    return await axios.put(`${API_URL}/colleges/achievements/update/${achievementId}`, updatedAchievement);
};

// Delete an achievement by ID
export const deleteAchievement = async (achievementId) => {
    return await axios.delete(`${API_URL}/colleges/achievements/delete/${achievementId}`);
};

// Student APIs
 export const getStudentAchievements = async () => {
    let studentId =null;
    if(sessionStorage.getItem('role') === 'student') {
        studentId = sessionStorage.getItem('roleSpecificId');
    }
    return await axios.get(`${API_URL}/students/${studentId}/achievements`);
};






