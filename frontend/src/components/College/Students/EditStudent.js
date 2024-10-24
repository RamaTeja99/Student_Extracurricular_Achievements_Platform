import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateStudent } from '../../../api';
import { FaTimes } from 'react-icons/fa';

const EditStudent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const student = location.state.student;

    const [name, setName] = useState(student.name);
    const [rollNumber, setRollNumber] = useState(student.rollNumber);
    const [dob, setDob] = useState(student.dob);
    const [email, setEmail] = useState(student.email);
    const [phoneNumber, setPhoneNumber] = useState(student.phoneNumber);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedStudent = { ...student, name, rollNumber, dob, email, phoneNumber };
            await updateStudent(student.id, updatedStudent);
            setMessage({ type: 'success', text: 'Student updated successfully!' });
            setTimeout(() => navigate('/college/dashboard/students'), 2000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update student. Please try again.' });
        }
    };

    const handleClose = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <form className="edit-student-form" onSubmit={handleSubmit}>
            <button className="close-icon" onClick={handleClose}>
                <FaTimes />
            </button>
            <h5>Edit Student</h5>

            <div className="form-group">
                <label htmlFor="name">Student Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=" "
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="rollNumber">Roll Number</label>
                <input
                    type="text"
                    id="rollNumber"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder=" "
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder=" "
                    required
                />
            </div>

            <button type="submit" className="submit-button">Update Student</button>

            {message && <div className={`${message.type}-message`}>{message.text}</div>}
        </form>
    );
};

export default EditStudent;
