import React, { useState, useEffect } from 'react';
import { getCollegeById, updateCollege, updateCollegeCredentials, getCollegeUserByCollegeId } from '../../api';
import './EditCollege.css'; // Reuse the same styles
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons

const EditCollege = ({ collegeId, onClose }) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for toggling password visibility
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchCollegeData = async () => {
            try {
                // Fetch college details
                const collegeResponse = await getCollegeById(collegeId);
                const college = collegeResponse.data;
                setName(college.name);
                setLocation(college.location);

                // Fetch college user credentials
                const userResponse = await getCollegeUserByCollegeId(collegeId);
                const collegeUser = userResponse.data;
                setUsername(collegeUser.username);
                setPassword(collegeUser.password); // Assuming password is available for display
            } catch (error) {
                console.error('Failed to fetch college or user data:', error);
            }
        };

        fetchCollegeData();
    }, [collegeId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Update college details
            const updatedCollege = { name, location };
            await updateCollege(collegeId, updatedCollege);

            // Update college credentials
            await updateCollegeCredentials(collegeId, username, password);

            setMessage({ type: 'success', text: 'College updated successfully!' });
            setTimeout(() => {
                setMessage(null);
                onClose(); // Close the edit form
            }, 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update college. Please try again.' });
            setTimeout(() => setMessage(null), 3000);
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="add-college-container">
            {/* Single form for college details and credentials */}
            <form onSubmit={handleUpdate} className="add-college-form">
                <div className="form-header">
                    <h2>Edit College</h2>
                    <FaTimes className="close-icon" onClick={onClose} /> {/* Close icon */}
                </div>
                <div className="form-group">
                  <label htmlFor="name">College Name</label>
                    <input 
                        type="text" 
                        id="name"
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                    <input 
                        type="text" 
                        id="location"
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group password-group">
                  <label htmlFor="password">Password</label>
                    <input 
                        type={isPasswordVisible ? 'text' : 'password'} // Toggle between text and password type
                        id="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    {/* Add eye icon to toggle password visibility */}
                    <span className="toggle-password-icon" onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <button type="submit">Update College</button>
                {message && message.type === 'success' && (
                    <div className="success-message">{message.text}</div>
                )}
                {message && message.type === 'error' && (
                    <div className="error-message">{message.text}</div>
                )}
            </form>
        </div>
    );
};

export default EditCollege;
