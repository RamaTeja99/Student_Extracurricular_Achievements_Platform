import React, { useState } from 'react';
import { addStudent, addStudentUser } from '../../api';
import './AddStudent.css';

const AddStudent = () => {
    const [name, setName] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const student = { name, rollNumber, dob, email, phoneNumber };
        const response = await addStudent(student);
        const savedStudent = response.data; 
        console.log('Saved Student:', savedStudent);
        const reversedDob = dob.split('-').reverse().join('');
        const user ={username: rollNumber,password: reversedDob,role:'student',roleSpecificId:savedStudent.id};
        console.log('User to be added:', user);
        await addStudentUser(user);
        setMessage({ type: 'success', text: 'Student added successfully!' });
        // Clear fields after submission
        setName('');
        setRollNumber('');
        setDob('');
        setEmail('');
        setPhoneNumber('');
        setTimeout(() => setMessage(null), 3000);
    }
        catch (error) {
            setMessage({ type: 'error', text: 'Failed to add college. Please try again.' });
            // Clear error message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        }
    };

    return (
        <form className="add-student-form" onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" required />
            <input type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} placeholder="Roll Number" required />
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="Date of Birth" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" required />
            <button type="submit">Add Student</button>
            {message && (
                    <div className={`${message.type}-message`}>
                        {message.text}
                    </div>
                )}
        </form>
    );
};

export default AddStudent;