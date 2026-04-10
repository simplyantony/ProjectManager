import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import API from '../api';

export default function ViewTeams() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/teams')
            .then((res) => setTeams(res.data))
            .catch(()=> {})
            .finally(() => setLoading(false));
    }, []);

    if(loading) {
        return(
            <div className="loading">
                <div className="spinner" />
                Loading teams...
            </div>
        );
    }

    return (
        <div>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1>Teams</h1>
                    <p>{teams.length} team{teams.length !== 1 ? 's' : ''} registered</p>
                </div>
                <Link to="/teams/create">
                    <button className="btn btn-primary">+ New Team</button>
                </Link>
            </div>

            {teams.length === 0 ? (
                <div className="empty-state card">
                    <div className="icon">👥</div>
                    <p>No teams yet. <Link to="/teams/create">Create the first one</Link>.</p>
                </div>
            ) : (
                <div className="team-grid">
                    {teams.map((team) => (
                        <div className="team-card" key={team._id}>
                            <div className="team-icon">👥</div>
                            <div>
                                <div className="team-name">{team.name}</div>
                                <div className="team-date">
                                    {new Date(team.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}