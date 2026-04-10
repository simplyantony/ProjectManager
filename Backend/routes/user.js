const express = require('express');
const router = express.Router();
const User = require('../models/User');

//Get all users
router.get('/' , async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error){
        res.status(500).json({message: error.message});
    }
});

//POST signup a new user
router.post('/signup', async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const existing = await User.findOne({email});
        if (existing) return res.status(400).json({message: 'Email already registered'});
        const newUser = new User({name, email, password});
        await newUser.save();
        res.status(201).json({message: 'User successfully registered', user: {_id: newUser._id, name: newUser.name, email: newUser.email}});
    } catch (error){
        res.status(400).json({message: error.message});
    }
});

module.exports = router;