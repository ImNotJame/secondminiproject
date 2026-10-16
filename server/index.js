require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/games', require('./routes/games'))
app.use('/api/steam', require('./routes/steam'));
app.use(express.static(path.join(__dirname,'..', 'public')));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(`http://localhost:${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
}) 