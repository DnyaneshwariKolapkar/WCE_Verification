const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    prn: {
        type: String,
        required: [true, 'PRN is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    branch: {
        type: String,
        required: [true, 'Branch is required'],
    },
    passingYear: {
        type: String,
        required: [true, 'Passing year is required'],
    },
    grade: {
        type: [String],
        required: [true, 'Grade is required'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

const StudentInfo = mongoose.model('StudentInfo', studentSchema);

module.exports = StudentInfo;