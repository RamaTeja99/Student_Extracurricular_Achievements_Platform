import React, { useState, useEffect } from 'react';
import { getAchievementsByStudent } from '../../api';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import './Portfolio.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Portfolio = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            const studentId = localStorage.getItem('studentId');
            const response = await getAchievementsByStudent(studentId);
            setAchievements(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching achievements:', error);
            setLoading(false);
        }
    };

    const categoryData = achievements.reduce((acc, achievement) => {
        acc[achievement.category] = (acc[achievement.category] || 0) + 1;
        return acc;
    }, {});

    const pieChartData = {
        labels: Object.keys(categoryData),
        datasets: [
            {
                data: Object.values(categoryData),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    const barChartData = {
        labels: achievements.map(achievement => achievement.title),
        datasets: [
            {
                label: 'Achievement Points',
                data: achievements.map(achievement => achievement.points),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="student-portfolio">
            <h2>Your Achievement Portfolio</h2>
            {loading ? (
                <div className="loading-spinner"></div>
            ) : (
                <div className="portfolio-content">
                    <div className="chart-container">
                        <h3>Achievement Categories</h3>
                        <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                    <div className="chart-container">
                        <h3>Achievement Points</h3>
                        <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                    <div className="achievements-table">
                        <h3>Achievements Details</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Points</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {achievements.map((achievement, index) => (
                                    <tr key={achievement.id} className="achievement-row">
                                        <td>{achievement.title}</td>
                                        <td>{achievement.category}</td>
                                        <td>{achievement.points}</td>
                                        <td>{new Date(achievement.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Portfolio;