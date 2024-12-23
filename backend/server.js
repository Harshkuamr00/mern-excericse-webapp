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
const connection = mongoose.connection;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });// thiese are the flags here working with real time update and changes you need to write it when you code
connection.once('open', () => {
    console.log("MongoDB database connected");
});

// now we are importing our models
const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

// now we are using these routes
app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);


// finally we are listening to our server on the given port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});