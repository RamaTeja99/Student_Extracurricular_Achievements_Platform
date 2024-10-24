import React, { useState, useEffect } from 'react';
import { getStudentAchievements } from '../../api';
import './StudentAchievements.css';

const StudentAchievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            const response = await getStudentAchievements();
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
                                <p>Activity: {achievement.activityName}</p>
                                <p>Position: {achievement.firstPosition ? 'First Position' : achievement.secondPosition ? 'Second Position' : achievement.thirdPosition ? 'Third Position' : 'Participation'}</p>
                                <p>Category: {achievement.activityCategory}</p>
                                <p>Date: {achievement.activityDate}</p>
                                <p>Points: {achievement.activitypoints}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StudentAchievements;
