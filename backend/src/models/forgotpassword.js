const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TempSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    tempString: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(Date.now() + 19800000),
        expires: 3600
    }
});

const Temp = mongoose.model('Temp', TempSchema);

module.exports = Temp;