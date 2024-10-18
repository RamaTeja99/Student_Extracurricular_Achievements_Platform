import React, { useState, useEffect } from 'react';
import { getColleges } from '../../api';
import EditCollege from './EditCollege'; // Import the EditCollege component
import './CollegeList.css';

const CollegeList = () => {
    const [colleges, setColleges] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCollegeId, setSelectedCollegeId] = useState(null);

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await getColleges();
                setColleges(response.data);
                console.log('Fetched colleges:', response.data);
            } catch (error) {
                console.error('Failed to fetch colleges:', error);
            }
        };
        fetchColleges();
    }, []);

    const handleEditClick = (collegeId) => {
        setSelectedCollegeId(collegeId);
        setIsEditing(true);
    };

    const handleCloseEdit = () => {
        setIsEditing(false);
        setSelectedCollegeId(null);
    };

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
                        <button onClick={() => handleEditClick(college.id)}>Edit</button>
                    </div>
                ))}
            </div>
            {isEditing && (
                <EditCollege collegeId={selectedCollegeId} onClose={handleCloseEdit} />
            )}
        </div>
    );
};

export default CollegeList;
