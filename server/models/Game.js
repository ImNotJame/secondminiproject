const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    appid:{type: Number, default: null},
    platform: { type: String, default: '' },
    cover: {type: String, default: ''},
    genre: {type:String, default: ''},
    status: { type: String, enum: ['backlog', 'playing', 'completed', 'dropped'], default: 'backlog' },
    rating: { type: Number, min: 0, max: 10, default: null },
}, {timestamps: true});

module.exports = mongoose.model('Game', gameSchema);