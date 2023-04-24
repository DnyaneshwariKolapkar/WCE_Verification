const Student = require("../models/student");
const Company = require("../models/company");
const trycatch = require("../error/errorhandler").trycatch;
const nodeMailer = require("nodemailer");

// ------------ POST REQUEST : /verification/admin/allreq ------------ //

exports.getApis = trycatch(async (req, res) => {
    const companies = await Company.find();
    res.status(200).json({
        status: "success",
        data: companies
    });
});


// ------------ POST REQUEST : /verification/admin/pendingreq ------------ //

exports.getPendingApis = trycatch(async (req, res) => {
    const companies = await Company.find({ isVerified: false });
    res.status(200).json({
        status: "success",
        data: companies
    });
});


// ------------ POST REQUEST : /verification/admin/getstudents ------------ //

exports.getStudents = trycatch(async (req, res) => {
    const students = await Student.find({ unqId: req.body.unqId })
    res.status(200).json({
        status: "success",
        data: students,
    });
});


// ------------ POST REQUEST : /verification/admin/verify ------------ //


// ------------ SEND THE EMAIL ------------ //

const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: 'demoritv1421@gmail.com',
        pass: 'gzbhjzpzyhsqxhwp'
    }
});

const sendEmail = (id, email) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Verification",
            html: `<h1>Verification</h1>
            <p>Document verification is done. Please find the certificate attached.</p>
            <p>Thank you</p>`,
            attachments: [
                {
                    filename: "certificate.pdf",
                    path: `http://localhost:5000/certificate/${id}.pdf`
                }
            ]
        };

        const info = transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.log(error);
        return 'data';
    }
}     

// ------------ API ------------ //

exports.verify = trycatch(async (req, res) => {
    const company = await Company.findOne({ _id: req.body.unqId });
    if (company === null) {
        throw new Error("Company not found");
    }

    const info = await sendEmail(req.body.unqId, company.orgEmail);
    if (info === null) {
        throw new Error("Email not sent");
    }
    company.isVerified = true;
    await company.save();
    res.status(200).json({
        status: "success",
        data: company
    });
});


// ------------ POST REQUEST : /verification/admin/verifystudent/:status ------------ //

exports.verifyStudent = trycatch(async (req, res) => {
    const status = req.params.status;
    const student = await Student.findOne({ _id: req.body.id });
    if (student === null) {
        throw new Error("Student not found");
    }
    if (status === "approved") {
        student.status = "approved";
    }
    else if (status === "rejected") {
        student.status = "rejected";
    }
    
    student.name = req.body.name;
    student.prn = req.body.prn;
    student.passingYear = req.body.passingYear;
    student.branch = req.body.branch;

    await student.save();
    res.status(200).json({
        status: "success",
        data: student
    });
});


// ------------ POST REQUEST : /verification/admin/getpdf ------------ //

const PDF = require('html-pdf');
const fs = require('fs');

exports.getpdf = trycatch(async (req, res) => {
    const options = {
        format: 'letter',
        childProcessOptions: {
            env: {
                OPENSSL_CONF: '/dev/null',
            },
        },
    };
    const company = await Company.findOne({ _id: req.body.unqId });
    const students = await Student.find({ unqId: req.body.unqId });
    const data = {
        name: company.orgName,
        students: students
    };

    let html = fs.readFileSync('./src/views/certificate.html', 'utf8', (err, data) => {
        if (err) throw err;
        return data;
    });
    html = html.split("{{name}}").join(data.name);
    let studentrows = "";
    for (let i = 0; i < data.students.length; i++) {
        studentrows += `<tr>
            <td>${i + 1}</td>
            <td>${data.students[i].name}</td>
            <td>B. Tech</td>
            <td>${data.students[i].prn}</td>
            <td>${data.students[i].passingYear}</td>
            <td>10</td>
            <td>${data.students[i].status}</td>
        </tr>`;
    }
    html = html.split("{{students}}").join(studentrows);
    html = html.split("{{date}}").join(new Date().toLocaleDateString());
    PDF.create(html, options).toFile(
        `./src/public/certificates/${req.body.unqId}.pdf`,
        (err, res) => {
            if (err) console.log(err);
        }
    );
    res.status(200).json({
        status: "success",
        message: "PDF Generated"
    });
});


// ------------ POST REQUEST : /verification/admin/studentsrequests/:tag ------------ //

exports.getStudentRequests = trycatch(async (req, res) => {
    const tag = req.params.tag;
    if (tag === "all") {
        const students = await Student.find();
        res.status(200).json({
            status: "success",
            data: students,
        });
    }
    else if (tag === "pending") {
        const students = await Student.find({ isVerified: false });
        res.status(200).json({
            status: "success",
            data: students,
        });
    }
    else if (tag === "verified") {
        const students = await Student.find({ isVerified: true });
        res.status(200).json({
            status: "success",
            data: students,
        });
    }
    else {
        throw new Error("Invalid tag");
    }
});