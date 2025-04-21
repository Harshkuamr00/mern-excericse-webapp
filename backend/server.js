const express = require('express');
const cors = require('cors');
// now adding mogodb to connect and configure
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;


// this is middlware
app.use(cors());  // Corrected from core() to cors()
app.use(express.json());

// this is what we want to in atlas database and uri does store our database
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 50000
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});

// now we are importing our models
const exerciseRouter = require('./routes/exercise');
const userRouter = require('./routes/users');

// now we are using these routes
app.use('/exercise', exerciseRouter);
app.use('/users', userRouter);


// finally we are listening to our server on the given port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});