import React, { useState, useEffect } from 'react';
import { getAllAchievements } from '../../../api';
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
                {achievements.length > 0 ? (
                    achievements.map((achievement) => (
                        <div key={achievement.id} className="achievement-card">
                            <h4>{achievement.activityName}</h4>
                            <div class="content">
                            <p><strong>Description:</strong>{achievement.activityDescription}</p>
                            <p><strong>Category:</strong> {achievement.activityCategory}</p>
                            {achievement.firstPosition && <p className="position">1st Place</p>}
                            {achievement.secondPosition && <p className="position">2nd Place</p>}
                            {achievement.thirdPosition && <p className="position">3rd Place</p>}
                            {!achievement.firstPosition && !achievement.secondPosition && !achievement.thirdPosition && <p className="position">Participation</p>}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No achievements found.</p>
                )}
            </div>
        </div>
    );
};

export default AchievementList;
