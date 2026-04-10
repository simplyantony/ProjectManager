import React, {useState, useEffect} from 'react';
import API from '../api';

const initialForm = {name: '', description: '', productOwner: '', manager: '', team: ''};

export default function CreateProject() {
    const [form, setForm] = useState(initialForm);
    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        Promise.all([API.get('/users'), API.get('/teams')])
            .then(([u, t]) => {
                setUsers(u.data);
                setTeams(t.data);
            })
            .catch(() => {
            })
            .finally(() => setDataLoading(false));
    }, []);

    const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const res = await API.post('/projects', form);
            setMessage({type: 'success', text: `Project "${res.data.name}" created successfully!`});
            setForm(initialForm);
        } catch (err) {
            setMessage({type: 'error', text: err.response?.data?.message || 'Failed to create project.'});
        } finally {
            setLoading(false);
        }
    };

    if (dataLoading) {
        return (
            <div className="loading">
                <div className="spinner"/>
                Loading users and teams...
            </div>
        );
    }

    return (
        <div>
            <div className="page-header">
                <h1>Create Project</h1>
                <p>Fill in the details to start a new project.</p>
            </div>

            <div className="card" style={{maxWidth: 560}}>
                {users.length === 0 && (
                    <div className="alert alert-error" style={{marginBottom: '1.25rem'}}>
                        No users found. Please <a href="/signup">signup at least one user</a> before creating a project.
                    </div>
                )}
                {teams.length === 0 && (
                    <div className="alert alert-error" style={{marginBottom: '1.25rem'}}>
                        No teams found. Please <a href="/teams/create">create at least one team</a> before creating a
                        project.
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Project Name</label>
                        <input
                            className="form-control"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="e.g. Inventory Management System"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Brief description of the project..."
                            rows={3}
                            required
                            style={{resize: 'vertical'}}
                        />
                    </div>

                    <div className="form-group">
                        <label>Product Owner</label>
                        <select
                            className="form-control"
                            name="productOwner"
                            value={form.productOwner}
                            onChange={handleChange}
                            required
                        >
                            <option value="">— Select a user —</option>
                            {users.map((u) => (
                                <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Project Manager</label>
                        <select
                            className="form-control"
                            name="manager"
                            value={form.manager}
                            onChange={handleChange}
                            required
                        >
                            <option value="">— Select a user —</option>
                            {users.map((u) => (
                                <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Team</label>
                        <select
                            className="form-control"
                            name="team"
                            value={form.team}
                            onChange={handleChange}
                            required
                        >
                            <option value="">— Select a team —</option>
                            {teams.map((t) => (
                                <option key={t._id} value={t._id}>{t.name}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={loading || users.length === 0 || teams.length === 0}
                    >
                        {loading ? 'Creating...' : 'Create Project'}
                    </button>
                </form>

                {message && (
                    <div className={`alert alert-${message.type === 'success' ? 'success' : 'error'}`}>
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
}