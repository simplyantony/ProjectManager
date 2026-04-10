import axios from 'axios';

const API = axios.create({baseURL: 'https://projectmanager-1-odhg.onrender.com/api'});

export default API;