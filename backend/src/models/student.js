const mongoose = require('mongoose');

const schema = mongoose.Schema;

const studentSchema = new schema({
    orgEmail: {
        type: String,
        required: [true, "Email is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    photo: {
        type: String,
        required: [true, "Photo is required"],
    },
    identity: {
        type: String,
        required: [true, "Identity is required"],
    },
    cert: {
        type: String,
        required: [true, "Cert is required"],
    },
    gradeCards: {
        type: [String],
        required: [true, "Grade Cards are required"],
    }
})   

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
