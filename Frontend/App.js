import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link, NavLink} from 'react-router-dom';
import Home from './pages/Home';
import SignupUser from './pages/SignupUser';
import CreateTeam from './pages/CreateTeam';
import ViewTeams from './pages/ViewTeams';
import CreateProject from './pages/CreateProjects';
import './App.css';
import ViewProjects from "./pages/ViewProjects";

function App() {
    return (
        <Router>
            <div className="app">
                <nav className="navbar">
                    <div className="nav-brand">
                        <Link to="/"> ProjectHub</Link>
                    </div>
                    <ul className="nav-links">
                        <li><NavLink to="/" end>Home</NavLink></li>
                        <li><NavLink to="/signup">Signup User</NavLink></li>
                        <li><NavLink to="/teams/create">Create Team</NavLink></li>
                        <li><NavLink to="/teams">View Teams</NavLink></li>
                        <li><NavLink to="/projects/create">Create Project</NavLink></li>
                        <li><NavLink to="/projects">View Projects</NavLink></li>
                    </ul>
                </nav>
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<SignupUser />} />
                        <Route path="/teams/create" element={<CreateTeam />} />
                        <Route path="/teams" element={<ViewTeams />} />
                        <Route path="/projects/create" element={<CreateProject />} />
                        <Route path="/projects" element={<ViewProjects />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;