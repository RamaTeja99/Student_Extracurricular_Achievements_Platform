import React, { useState, useEffect } from 'react';
import { getColleges } from '../../api';
import './CollegeList.css';

const CollegeList = () => {
    const [colleges, setColleges] = useState([]);

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await getColleges();
                // Assuming the API returns college data with student and achievement counts
                setColleges(response.data);
            } catch (error) {
                console.error('Failed to fetch colleges:', error);
            }
        };
        fetchColleges();
    }, []);

    return (
        <div className="college-list-container">
            <div className="college-list-header">
                <h3>Colleges</h3>
            </div>
            <div className="college-grid">
                {colleges.map((college) => (
                    <div key={college.id} className="college-card">
                        <div className="college-name">{college.name}</div>
                        <div className="college-location">{college.location}</div>
                        <div className="college-stats">
                            <div className="stat">
                                <div className="stat-value">{college.studentCount}</div>
                                <div className="stat-label">Students</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value">{college.achievementCount}</div>
                                <div className="stat-label">Achievements</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollegeList;