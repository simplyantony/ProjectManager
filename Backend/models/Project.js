const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    productOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    manager: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    team: {type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true},
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);