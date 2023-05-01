const mongoose = require('mongoose');

const schema = mongoose.Schema;

const studentSchema = new schema({
    unqId: {
        type: String,
        required: [true, "Students Id is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    prn: {
        type: String,
        required: [true, "PRN is required"],
        default: "Not Provided",
    },
    branch: {
        type: String,
        required: [true, "Branch is required"],
        default: "Not Provided",
    },
    passingYear: {
        type: String,
        required: [true, "Passing Year is required"],
        default: "Not Provided",
    },
    documents: {
        type: [String],
        required: [true, "Documents are required"],
    },
    qualification: {
        type: String,
        enum: ["B.Tech", "B.E", "M.Tech", "M.E", "Not Provided"],
        required: [true, "Qualification is required"],
        default: "Not Provided",
    },
    finalGrade: {
        type: String,
        required: [true, "Result is required"],
        default: "Not Provided",
    },
    fields: {
        type: [String],
        required: [true, "Fields are required"],
        default: "Not Provided",
    },
    status: {
        enum: ["pending", "valid", "invalid"],
        type: String,
        default: "pending",
    }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
