const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(email) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
            },
            message: '{VALUE} is not a valid email address'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
