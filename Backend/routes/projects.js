const express= require('express');
const router = express.Router();
const Project = require("../models/Project");

//Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('productOwner', 'name email')
            .populate('manager', 'name email')
            .populate('team', 'name');
        res.json(projects);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

//POST Create project
router.post('/', async (req, res) => {
    try {
        const {name, description, productOwner, manager, team} = req.body;
        const project = new Project({name, description, productOwner, manager, team});
        await project.save();
        const populated = await project.populate([
            {path: 'productOwner', select: 'name email'},
            {path: 'manager', select: 'name email'},
            {path: 'team', select:'name'},
        ]);
        res.status(201).json(populated);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = router;