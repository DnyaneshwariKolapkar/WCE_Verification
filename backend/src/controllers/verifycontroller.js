const Student = require("../models/student");
const Company = require("../models/company");
const trycatch = require("../error/errorhandler").trycatch;

// ------------ POST REQUEST : /verification/admin/allreq ------------ //

exports.getApis = trycatch(async (req, res) => {
    const companies = await Company.find({ isVerified: false });
    res.status(200).json({
        status: "success",
        data: {
            companies,
        },
    });
});


// ------------ POST REQUEST : /verification/admin/getstudents ------------ //

exports.getStudents = trycatch(async (req, res) => {
    console.log(req.body.unqId);
    const students = await Student.find({ unqId: req.body.unqId })
    res.status(200).json({
        status: "success",
        data: {
            students,
        },
    });
});


// ------------ POST REQUEST : /verification/admin/verify ------------ //

exports.verify = trycatch(async (req, res) => {
    const company = await Company.findOne({ _id: req.body.unqId });
    company.isVerified = true;
    await company.save();
    res.status(200).json({
        status: "success",
        data: {
            company,
        },
    });
});


// ------------ GET REQUEST : /verification/getpdf ------------ //

const PDF = require('html-pdf');
const fs = require('fs');

const html = fs.readFileSync('./temp.html', 'utf8');
exports.getpdf = trycatch(async (req, res) => {
    const options = {
        format: 'A4',
        childProcessOptions: {
            env: {
                OPENSSL_CONF: '/dev/null',
            },
        },
    };
    PDF.create(html, options).toFile(
        './temp.pdf',
        (err, res) => {
            if (err) res.status(500).send(err);
        }
    );
    res.status(200).json({
        status: "success",
        message: "PDF Generated"
    });
});

