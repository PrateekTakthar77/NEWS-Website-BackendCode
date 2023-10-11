const express = require("express");
const app = express();
const cors = require('cors'); // Import the cors middleware
require('dotenv').config()
const { Collection, default: mongoose } = require('mongoose');

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000
app.use(express.json());
const authRoute = require("./routes/auth");
const Postroute = require("./routes/Posts");
const catRoute = require("./routes/category")
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // You can enable credentials if your application uses cookies or HTTP authentication
};

app.use(cors(corsOptions));

app.use(cors());
app.use("/api/auth", authRoute)
app.use("/api/article", Postroute)
app.use("/api/category", catRoute)


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