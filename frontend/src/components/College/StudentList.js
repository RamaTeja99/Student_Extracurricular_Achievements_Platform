import React, { useEffect, useState } from 'react';
import { getStudents } from '../../api';
import './StudentList.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await getStudents();
            setStudents(response.data);
        };
        fetchStudents();
    }, []);

    return (
        <div className="student-list-container">
            <h3>Students</h3>
            <ul className="student-list">
                {students.map((student) => (
                    <li key={student.id} className="student-item">
                        <span className="student-name">{student.name}</span>
                        <span className="student-roll">{student.rollNumber}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;