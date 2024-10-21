import React, { useEffect, useState } from 'react';
import { getStudentsByCollege, getAchievementsByStudent, updateAchievement, deleteAchievement } from '../../api'; // Adjust the path as needed
import './StudentList.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [editAchievementData, setEditAchievementData] = useState(null); // For editing achievements

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getStudentsByCollege();
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        fetchStudents();
    }, []);

    const handleStudentClick = async (student) => {
        setSelectedStudent(student);
        try {
            const response = await getAchievementsByStudent(student.rollNumber);
            setAchievements(response.data);
        } catch (error) {
            console.error('Error fetching achievements:', error);
        }
    };

    const handleEditClick = (achievement) => {
        setEditAchievementData(achievement); // Set the data to be edited
    };

    const handleDeleteClick = async (achievementId) => {
        try {
            await deleteAchievement(achievementId); // Call the delete API
            setAchievements(achievements.filter((ach) => ach.id !== achievementId)); // Update the local state
        } catch (error) {
            console.error('Error deleting achievement:', error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateAchievement(editAchievementData.id, editAchievementData); // Use the update API
            console.log('Achievement updated:', response.data);
            setAchievements(achievements.map((ach) => (ach.id === editAchievementData.id ? response.data : ach))); // Update local state
            setEditAchievementData(null); // Close the edit form
        } catch (error) {
            console.error('Error updating achievement:', error);
        }
    };

    const handleChangeEdit = (e) => {
        const { name, value, type, checked } = e.target;
        setEditAchievementData({
            ...editAchievementData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    return (
        <div className="student-list-container">
            <h3>Students</h3>
            <ul className="student-list">
                {students.map((student) => (
                    <li
                        key={student.id}
                        className="student-item"
                        onClick={() => handleStudentClick(student)}
                    >
                        <span className="student-name">{student.name}</span>
                        <span className="student-roll">{student.rollNumber}</span>
                    </li>
                ))}
            </ul>

            {selectedStudent && (
                <div className="student-details">
                    <h4>Details of {selectedStudent.name}</h4>
                    <p>Roll Number: {selectedStudent.rollNumber}</p>
                    <p>Email: {selectedStudent.email}</p>
                    <p>Phone: {selectedStudent.phoneNumber}</p>

                    <h4>Achievements</h4>
                    {achievements.length > 0 ? (
                        <ul className="achievement-list">
                            {achievements.map((achievement) => (
                                <li key={achievement.id} className="achievement-item">
                                    <p>Activity: {achievement.activityName}</p>
                                    <p>Position: {achievement.firstPosition ? 'First Position' : achievement.secondPosition ? 'Second Position' : achievement.thirdPosition ? 'Third Position' : 'Participation'}</p>
                                    <p>Category: {achievement.activityCategory}</p>
                                    <button onClick={() => handleEditClick(achievement)}>Edit</button>
                                    <button onClick={() => handleDeleteClick(achievement.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No achievements found for this student.</p>
                    )}
                </div>
            )}

            {/* Edit Achievement Form */}
            {editAchievementData && (
                <div>
                    <h3>Edit Achievement</h3>
                    <form onSubmit={handleEditSubmit}>
                        <div>
                            <label>Activity Name:</label>
                            <input
                                type="text"
                                name="activityName"
                                value={editAchievementData.activityName}
                                onChange={handleChangeEdit}
                                required
                            />
                        </div>
                        <div>
                            <label>Activity Description:</label>
                            <textarea
                                name="activityDescription"
                                value={editAchievementData.activityDescription}
                                onChange={handleChangeEdit}
                            />
                        </div>
                        <div>
                            <label>Activity Category:</label>
                            <select
                                name="activityCategory"
                                value={editAchievementData.activityCategory}
                                onChange={handleChangeEdit}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Sports">Sports</option>
                                <option value="Arts">Arts (music, theater, visual arts)</option>
                                <option value="Academic Clubs">Academic clubs (debate, science club)</option>
                                <option value="Volunteer Work">Volunteer work/community service</option>
                            </select>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    name="firstPosition"
                                    checked={editAchievementData.firstPosition}
                                    onChange={handleChangeEdit}
                                />
                                First Position
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="secondPosition"
                                    checked={editAchievementData.secondPosition}
                                    onChange={handleChangeEdit}
                                />
                                Second Position
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="thirdPosition"
                                    checked={editAchievementData.thirdPosition}
                                    onChange={handleChangeEdit}
                                />
                                Third Position
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="participation"
                                    checked={editAchievementData.participation}
                                    onChange={handleChangeEdit}
                                />
                                Participation
                            </label>
                        </div>
                        <button type="submit">Update Achievement</button>
                        <button type="button" onClick={() => setEditAchievementData(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default StudentList;
