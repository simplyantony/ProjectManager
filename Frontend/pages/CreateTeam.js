import React, {useState} from 'react';
import API from '../api';

export default function CreateTeam(){
    const [name, setName] = useState('');
    const [message, setMessage] = useState(null);
    const[loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try{
            const res = await API.post('/teams', {name});
            setMessage({type: 'success', text: `Team "${res.data.name}" has been created successfully.`})
            setName('');
        } catch(error) {
            setMessage({type: 'error', text: error.response?.data?.message || 'Failed to create team.'});
        } finally {
            setLoading(false);
        }
    };

    return(
        <div>
            <div className="page-header">
                <h1>Create Team</h1>
                <p>Add a new team to the system.</p>
            </div>

            <div className="card" style={{maxWidth: 480 }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Team Name</label>
                        <input
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Backend Engineers"
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? 'Creating...': 'Create Team'}
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