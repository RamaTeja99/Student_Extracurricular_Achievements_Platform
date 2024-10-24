import React, { useState } from 'react';
import { addAchievement } from '../../../api'; // Ensure to adjust the path to your api.js file
import './AddAchievement.css'; // Import the CSS file

const AddAchievement = () => {
    const [studentRollNumber, setStudentRollNumber] = useState('');
    const [achievementData, setAchievementData] = useState({
        activityName: '',
        activityDescription: '',
        activityCategory: '',
        activityDate: '',
        activitypoints: 0,
        firstPosition: false,
        secondPosition: false,
        thirdPosition: false,
        participation: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // If the checkbox is being checked, ensure only one is checked
        if (type === 'checkbox') {
            setAchievementData(prevState => ({
                ...prevState,
                // Set all positions to false, except the one being checked
                firstPosition: name === 'firstPosition' ? checked : false,
                secondPosition: name === 'secondPosition' ? checked : false,
                thirdPosition: name === 'thirdPosition' ? checked : false,
                participation: name === 'participation' ? checked : false,
            }));
        } else {
            setAchievementData({
                ...achievementData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addAchievement(studentRollNumber, achievementData);
            console.log('Achievement added:', response.data);
            // Reset form
            setStudentRollNumber('');
            setAchievementData({
                activityName: '',
                activityDescription: '',
                activityCategory: '',
                activityDate: '',
                activitypoints: 0,
                firstPosition: false,
                secondPosition: false,
                thirdPosition: false,
                participation: false,
            });
        } catch (error) {
            console.error('Error adding achievement:', error);
        }
    };

    return (
        <div className="add-achievement-form">
            <h3 className="form-title">Add Achievement</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Student Roll Number:</label>
                    <input
                        type="text"
                        name="studentRollNumber"
                        value={studentRollNumber}
                        onChange={(e) => setStudentRollNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Activity Name:</label>
                    <input
                        type="text"
                        name="activityName"
                        value={achievementData.activityName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Activity Description:</label>
                    <textarea
                        name="activityDescription"
                        value={achievementData.activityDescription}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Activity Category:</label>
                    <select
                        name="activityCategory"
                        value={achievementData.activityCategory}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Sports">Sports</option>
                        <option value="Arts">Arts</option>
                        <option value="Academic Clubs">Academic Clubs</option>
                        <option value="Volunteer Work">Volunteer Work/Community Service</option>
                    </select>
                </div>
                <div>
                    <label>Activity Date:</label>
                    <input
                        type="date"
                        name="activityDate"
                        value={achievementData.activityDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Activity Points:</label>
                    <input
                        type="number"
                        name="activitypoints"
                        value={achievementData.activitypoints}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="firstPosition"
                            className="checkbox"
                            name="firstPosition"
                            checked={achievementData.firstPosition}
                            onChange={handleChange}
                        />
                        <label className="checkbox-label" htmlFor="firstPosition">First Position</label>
                    </div>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="secondPosition"
                            className="checkbox"
                            name="secondPosition"
                            checked={achievementData.secondPosition}
                            onChange={handleChange}
                        />
                        <label className="checkbox-label" htmlFor="secondPosition">Second Position</label>
                    </div>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="thirdPosition"
                            className="checkbox"
                            name="thirdPosition"
                            checked={achievementData.thirdPosition}
                            onChange={handleChange}
                        />
                        <label className="checkbox-label" htmlFor="thirdPosition">Third Position</label>
                    </div>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="participation"
                            className="checkbox"
                            name="participation"
                            checked={achievementData.participation}
                            onChange={handleChange}
                        />
                        <label className="checkbox-label" htmlFor="participation">Participation</label>
                    </div>
                </div>
                <button type="submit">Add Achievement</button>
            </form>
        </div>
    );
};

export default AddAchievement;
