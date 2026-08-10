import React from 'react';
import './Dashboard.css';

const Dashboard = ({ email, onLogout }) => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <div className="dashboard-title">Welcome!</div>
                <div className="dashboard-email">{email}</div>
                <div className="dashboard-subtitle">You have successfully logged in.</div>
                <button className="logout-btn" onClick={onLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;
