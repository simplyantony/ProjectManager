import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import API from '../api';

export default function ViewProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/projects')
            .then((res) => setProjects(res.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if(loading){
        return (
            <div className="loading">
                <div className="spinner" />
                Loading projects...
            </div>
        );
    }
    return (
        <div>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1>Projects</h1>
                    <p>{projects.length} project{projects.length !== 1 ? 's' : ''} found</p>
                </div>
                <Link to="/projects/create">
                    <button className="btn btn-primary">+ New Project</button>
                </Link>
            </div>

            {projects.length === 0 ? (
                <div className="empty-state card">
                    <p>No projects yet. <Link to="/projects/create">Create the first one</Link>.</p>
                </div>
            ) : (
                <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Project Name</th>
                            <th>Description</th>
                            <th>Product Owner</th>
                            <th>Manager</th>
                            <th>Team</th>
                            <th>Created</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projects.map((p, i) => (
                            <tr key={p._id}>
                                <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{i + 1}</td>
                                <td style={{ fontWeight: 600 }}>{p.name}</td>
                                <td style={{ maxWidth: 220, color: 'var(--text-muted)' }}>
                    <span title={p.description}>
                      {p.description.length > 60 ? p.description.slice(0, 60) + '…' : p.description}
                    </span>
                                </td>
                                <td>
                                    <span className="badge badge-user">{p.productOwner?.name || '—'}</span>
                                </td>
                                <td>
                                    <span className="badge badge-user">{p.manager?.name || '—'}</span>
                                </td>
                                <td>
                                    <span className="badge badge-team">{p.team?.name || '—'}</span>
                                </td>
                                <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                    {new Date(p.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}