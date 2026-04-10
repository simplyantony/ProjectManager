import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import API from '../api';

export default function Home(){
    const [counts, setCounts] = useState({users: 0, teams: 0, projects: 0});

    useEffect(() => {
        Promise.all([
            API.get('/users'),
            API.get('/teams'),
            API.get('/projects'),
        ])
            .then(([u, t, p]) =>
                setCounts({users: u.data.length, teams: t.data.length, projects: p.data.length})
            )
            .catch(() => {});
    }, []);

    const quickLinks = [
        {to: '/signup', label: 'Signup User', desc: 'Register User'},
        {to: '/teams/create', label: 'Create Team', desc: 'Add a new team'},
        {to: '/projects/create', label: 'Create Project', desc: 'Start a new project'},
        {to: '/projects', label: 'View Projects', desc: 'Browse all projects'},
    ];

    return(
        <div>
            <div className="page-header">
                <h1>Welcome to ProjectHub</h1>
                <p>Manage your teams and projects in one place.</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-label">Users</div>
                    <div className="stat-value">{counts.users}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Teams</div>
                    <div className="stat-value">{counts.teams}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Projects</div>
                    <div className="stat-value">{counts.projects}</div>
                </div>
            </div>

            <div className="page-header">
                <h1 style={{fontSize: '1.2rem'}}>Quick Actions</h1>
            </div>

            <div className="team-grid">
                {quickLinks.map((l) => (
                    <Link key={l.to} to={l.to} style={{ textDecoration: 'none' }}>
                        <div className="team-card" style={{ cursor: 'pointer', transition: 'box-shadow 0.15s' }}
                             onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(79,70,229,0.15)'}
                             onMouseLeave={e => e.currentTarget.style.boxShadow = ''}>
                            <div>
                                <div className="team-name">{l.label}</div>
                                <div className="team-date">{l.desc}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}