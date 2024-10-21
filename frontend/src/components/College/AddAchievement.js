import React, { useState } from 'react';
import { addAchievement } from '../../api'; // Ensure to adjust the path to your api.js file

const AddAchievement = () => {
    const [studentRollNumber, setStudentRollNumber] = useState('');
    const [achievementData, setAchievementData] = useState({
        activityName: '',
        activityDescription: '',
        activityCategory: '',
        firstPosition: false,
        secondPosition: false,
        thirdPosition: false,
        participation: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAchievementData({
            ...achievementData,
            [name]: type === 'checkbox' ? checked : value,
        });
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
        <div>
            <h3>Add Achievement</h3>
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
                            checked={achievementData.firstPosition}
                            onChange={handleChange}
                        />
                        First Position
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="secondPosition"
                            checked={achievementData.secondPosition}
                            onChange={handleChange}
                        />
                        Second Position
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="thirdPosition"
                            checked={achievementData.thirdPosition}
                            onChange={handleChange}
                        />
                        Third Position
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="participation"
                            checked={achievementData.participation}
                            onChange={handleChange}
                        />
                        Participation
                    </label>
                </div>
                <button type="submit">Add Achievement</button>
            </form>
        </div>
    );
};

export default AddAchievement;
