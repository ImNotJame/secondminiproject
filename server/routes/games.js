const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

router.get('/', async (req, res) => {
    res.json(await Game.find().sort({ createdAt: -1 }));
});

router.post('/', async (req, res) => {
    try{
        res.status(201).json(await Game.create(req.body));
    } catch (err) {
        res.status(400).json({error: err.message});
    }
        
});


router.put('/:id', async (req,res) =>{
    try{
        const game = await Game.findByIdAndUpdate(req.params.id, req.body, {returnDocument:'after', runValidators: true});
        if (!game) return res.status(404).json({error: "Game not found"});
        res.json(game);
    } catch (e){
        res.status(400).json({error: e.message});
    }
});


router.delete('/:id', async (req,res) =>{
    await Game.findByIdAndDelete(req.params.id);
    res.status(204).end();
});


module.exports = router;