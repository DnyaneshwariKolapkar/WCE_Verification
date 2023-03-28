const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        default: 'user'
    },
    token: {
        type: String,
        trim: true
    },
    tempString: {
        type: String,
        trim: true
    }
});

UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.hash(user.password, 10, (error, encrypted) => {
            user.password = encrypted;
            next();
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;