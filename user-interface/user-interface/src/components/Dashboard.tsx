import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';
import { useFetchWithAuth } from '../hooks/useFetchWithAuth';
import AccountData from './AccountData';

const Dashboard: React.FC = () => {

    const fetchWithAuth = useFetchWithAuth();
    const { user, logout } = useAuth();

    const [userAccountData, setUserAccountData] = useState([])


    const getUserData = () => {
        let url = "/api/v1/account/" + user?.id
        const response = fetchWithAuth<any>(url, {
            method: 'GET',

        }).then((userData: any) => setUserAccountData(userData));
    }


    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <div className="dashboard-title">Welcome!</div>
                <div className="dashboard-email">{user?.username}</div>
                <div className="dashboard-subtitle">You have successfully logged in.</div>
                <button className="logout-btn" onClick={getUserData}>Fetch user data</button>
                <ul>
                    {userAccountData.map((userAccountData, index) => (
                        <AccountData data={userAccountData}/>
                    ))}
                </ul>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;
