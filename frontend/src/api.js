import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust according to your backend URL

// Authentication API
export const login = async (username, password, role) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { username, password, role });
        return response;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};

export const getColleges = async () => {
    return await axios.get(`${API_URL}/admin/colleges`);
};

export const addCollege = async (college) => {
    return await axios.post(`${API_URL}/admin/colleges`, college);
};
export const addCollegeUser = async(user) =>{
    return await axios.post(`${API_URL}/admin/addcollegeuser`,user);
};
export const getStudents = async () => {
    return await axios.get(`${API_URL}/admin/students`);
};

export const getAllAchievements = async () => {
    return await axios.get(`${API_URL}/admin/achievements`);
};

// College APIs
export const getStudentsByCollege = async () => {
    return await axios.get(`${API_URL}/college/students`);
};

export const addStudent = async (student) => {
    return await axios.post(`${API_URL}/college/students`, student);
};

// Student APIs
export const getAchievementsByStudent = async (studentId) => {
    return await axios.get(`${API_URL}/students/${studentId}/achievements`);
};

// You might want to keep these, even though they're not explicitly used in the provided components
export const updateCollege = async (id, college) => {
    return await axios.put(`${API_URL}/admin/colleges/${id}`, college);
};

export const deleteCollege = async (id) => {
    return await axios.delete(`${API_URL}/admin/colleges/${id}`);
};

export const updateStudent = async (id, student) => {
    return await axios.put(`${API_URL}/college/students/${id}`, student);
};

export const deleteStudent = async (id) => {
    return await axios.delete(`${API_URL}/college/students/${id}`);
};

export const addAchievement = async (achievement) => {
    return await axios.post(`${API_URL}/achievements`, achievement);
};

export const updateAchievement = async (id, achievement) => {
    return await axios.put(`${API_URL}/achievements/${id}`, achievement);
};

export const deleteAchievement = async (id) => {
    return await axios.delete(`${API_URL}/achievements/${id}`);
};