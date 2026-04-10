const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use('/api/users', require('./routes/user'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/projects', require('./routes/projects'));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/projectmanager';

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
})
.catch((err) => console.error('MongoDB Connection Error:', err));