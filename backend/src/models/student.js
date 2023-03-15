const mongoose = require('mongoose');

const schema = mongoose.Schema;

const studentSchema = new schema({
    orgName: {
        type: String,
        required: [true, "Organization Name is required"],
    },
    orgEmail: {
        type: String,
        required: [true, "Email is required"],
    },
    orgAddress: {
        type: String,
        required: [true, "Address is required"],
    },
    unqId: {
        type: String,
        required: [true, "Students Id is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    documents: {
        type: [String],
        required: [true, "Grade Cards are required"],
    }
})   

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
