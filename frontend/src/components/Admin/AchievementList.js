import React, { useState, useEffect } from 'react';
import { getAllAchievements } from '../../api';
import './AchievementList.css';

const AchievementList = () => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await getAllAchievements();
                setAchievements(response.data);
            } catch (error) {
                console.error('Error fetching achievements:', error);
            }
        };
        fetchAchievements();
    }, []);

    return (
        <div className="achievement-list">
            <h3 className="achievement-title">Achievements</h3>
            <div className="achievement-grid">
                {achievements.map((achievement) => (
                    <div key={achievement.id} className="achievement-card">
                        <h4>{achievement.title}</h4>
                        <p>{achievement.description}</p>
                        <span className="achievement-date">{new Date(achievement.date).toLocaleDateString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AchievementList;