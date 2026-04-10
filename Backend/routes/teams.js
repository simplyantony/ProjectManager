const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

//Get all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// POST create team
router.post('/', async (req, res) => {
    try{
        const {name} = req.body;
        const existing = await Team.findOne({name});
        if(existing) return res.status(400).json({message: 'Team name already registered'});
        const newTeam = new Team({name});
        await newTeam.save();
        res.status(201).json(newTeam);
    } catch(error){
        res.status(400).json({message: error.message});
    }
});

module.exports = router;