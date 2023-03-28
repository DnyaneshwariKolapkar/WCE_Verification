const mongoose = require('mongoose');

const schema = mongoose.Schema;

const companySchema = new schema({
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    studentsCount: {
        type: Number,
        required: [true, "Students Count is required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;