const mongoose = require('mongoose');
const User = require('./user.model');

const  Schema =  mongoose.Schema;

const exerciseSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now 
    },
    username: {
        type: mongoose.Schema.ObjectId, ref: User
    }
}, {
    timestamps: true  // this is for time when it was modified and create or deleted
});

// now we intregrate an api to do CURD opreations in the routes floder 

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;  // we export this schema so that other files can use it.