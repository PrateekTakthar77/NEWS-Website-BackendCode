const express = require("express");
const app = express();
require('dotenv').config()
const { Collection, default: mongoose } = require('mongoose');

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        message: 'working'
    })
})

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Database connected succesfully :)");
        app.listen(PORT, (err) => {
            if (err) console.log(err.message)
            console.log('app is running on port', PORT)
        })
    }).catch((error) => {
        console.log("error while connecting to the database ", error);
    })