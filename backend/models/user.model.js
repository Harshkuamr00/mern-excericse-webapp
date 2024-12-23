// first we need to require moongoose as we do earlier
const mongoose = require('mongoose');

// this is the bais snytax to write when you create a schema
const Schema = mongoose.Schema;

// user schema is the name of the schema  username is the only field then we have some validations

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true, // someone type the spaces it will be trimed off
        minlength : 3,
        
    },
},{
    timestamps : true,// this is for time when it was modified and create or deleted
});

const User = mongoose.model('User',userSchema);

module.exports = User;  // we export this schema so that other files can use it.
