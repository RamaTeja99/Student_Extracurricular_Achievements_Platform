import React, { useState, useEffect } from 'react';
import { getAllAchievements } from '../../../api';
import CertificateGenerator from '../../College/Achievements/CertificateGenerator'; // Adjust import as necessary
import { FaDownload } from 'react-icons/fa';
import './AchievementList.css';

const AchievementList = () => {
    const [achievements, setAchievements] = useState([]);
    const [expandedStudents, setExpandedStudents] = useState({});
    const [selectedAchievement, setSelectedAchievement] = useState(null);

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

    const groupedAchievements = achievements.reduce((acc, achievement) => {
        const studentId = achievement.student.id;
        if (!acc[studentId]) {
            acc[studentId] = {
                student: achievement.student,
                achievements: [],
            };
        }
        acc[studentId].achievements.push(achievement);
        return acc;
    }, {});

    const recentAchievements = Object.values(groupedAchievements).map(({ student, achievements }) => {
        const mostRecent = achievements.sort((a, b) => new Date(b.activityDate) - new Date(a.activityDate))[0];
        return { student, achievement: mostRecent };
    });

    const handleStudentClick = (studentId) => {
        setExpandedStudents((prev) => ({
            ...prev,
            [studentId]: !prev[studentId],
        }));
    };

    const handleDownload = (achievement) => {
        setSelectedAchievement(achievement);
    };

    

    return (
        <div className="admin-achievement-list">
            <h3 className="admin-achievement-title">Achievements</h3>
            <table className="admin-achievement-table">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>College</th>
                        <th>Activity</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Certificate</th>
                    </tr>
                </thead>
                <tbody>
                    {recentAchievements.map(({ student, achievement }) => (
                        <React.Fragment key={student.id}>
                            <tr onClick={() => handleStudentClick(student.id)} className="admin-achievement-row">
                                <td>{student.name}</td>
                                <td>{student.college.name}</td>
                                <td>{achievement.activityName}</td>
                                <td>{achievement.activityDescription}</td>
                                <td>{achievement.activityDate}</td>
                                <td>
                                <FaDownload 
                                        className="download-icon" 
                                        onClick={(e) => { e.stopPropagation(); handleDownload(achievement); }} 
                                    />
                            </td>

                            </tr>
                            {expandedStudents[student.id] && achievement && (
                                <tr>
                                    <td colSpan="6" className="admin-expanded-row">
                                        <table className="admin-subtable">
                                            <thead>
                                                <tr>
                                                    <th>Activity</th>
                                                    <th>Description</th>
                                                    <th>Date</th>
                                                    <th>Certificate</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {groupedAchievements[student.id].achievements.map((ach) => (
                                                    <tr key={ach.id}>
                                                        <td>{ach.activityName}</td>
                                                        <td>{ach.activityDescription}</td>
                                                        <td>{ach.activityDate}</td>
                                                        <td>
                                                        <FaDownload 
                                        className="download-icon" 
                                        onClick={(e) => { e.stopPropagation(); handleDownload(achievement); }} 
                                    />
                                                    </td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                       
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {selectedAchievement && (
                <CertificateGenerator achievement={selectedAchievement} />
            )}
        </div>
    );
};

export default AchievementList;
