import React, { useState, useEffect } from 'react';
import { getAchievementsByStudent } from '../../api';
import './StudentAchievements.css';

const StudentAchievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            // Assuming we have the student ID stored in localStorage or context
            const studentId = localStorage.getItem('studentId');
            const response = await getAchievementsByStudent(studentId);
            setAchievements(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching achievements:', error);
            setLoading(false);
        }
    };

    return (
        <div className="student-achievements">
            <h2>Your Achievements</h2>
            {loading ? (
                <div className="loading-spinner"></div>
            ) : (
                <ul className="achievement-list">
                    {achievements.map((achievement) => (
                        <li key={achievement.id} className="achievement-item">
                            <div className="achievement-content">
                                <h3>{achievement.title}</h3>
                                <p>{achievement.description}</p>
                                <span className="achievement-date">{new Date(achievement.date).toLocaleDateString()}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StudentAchievements;