import React, { useState } from 'react';
import { addStudent } from '../../api';
import './AddStudent.css';

const AddStudent = () => {
    const [name, setName] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const student = { name, rollNumber, dob, email, phoneNumber };
        await addStudent(student);
        // Clear fields after submission
        setName('');
        setRollNumber('');
        setDob('');
        setEmail('');
        setPhoneNumber('');
    };

    return (
        <form className="add-student-form" onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" required />
            <input type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} placeholder="Roll Number" required />
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="Date of Birth" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" required />
            <button type="submit">Add Student</button>
        </form>
    );
};

export default AddStudent;