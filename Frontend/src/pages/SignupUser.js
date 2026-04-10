import React, {useState} from 'react';
import API from '../api';

export default function SignupUser() {
    const [form, setForm] = useState({name: '', email: '', password: ''});
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const res = await API.post('/users/signup', form);
            setMessage({type: 'success', text: `User "${res.data.user.name}" registered successfully`});
            setForm({name: '', email: '', password: ''});
        } catch (error) {
            setMessage({type: 'error', text: error.response?.data?.message || 'Failed to register user.'});
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h1>Signup User</h1>
                <p>Register a new user to the application.</p>
            </div>

            <div className="card" style={{maxWidth: 480}}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            className="form-control"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="e.g. Alice Johnson"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            className="form-control"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="e.g. alice@example.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            className="form-control"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Min. 6 characters"
                            minLength={6}
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Create Account'}
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