const Student = require("../models/student");
const Company = require("../models/company");
const multer = require("multer");
const trycatch = require("../error/errorhandler").trycatch;
const crypto = require("crypto");



// ------------ POST REQUEST : /verification/insertstudent ------------ //

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./src/public/students/`);
  },
  filename: function (req, file, cb) {
    cb(null, crypto.randomBytes(16).toString("hex") + '.' + file.originalname.split(".")[1]);
  },
});
exports.upload = multer({ storage: storage });

exports.insertStudent = trycatch (async (req, res) => {
  const documents = new Map();
  for (let i = 0; i < req.files.length; i++) {
    const index = parseInt(req.files[i].fieldname.split("Documents")[1]);
    if (documents.has(index)) {
      documents.get(index).push(req.files[i].filename);
    } else {
      documents.set(index, [req.files[i].filename]);
    }
  }
  const company = new Company({
    orgName: req.body.orgName,
    orgAddress: req.body.orgAddress,
    email: req.body.orgEmail,
    studentsCount: req.body.studentCount
  });
  const students = [];
  console.log(req.body);
  for (let i = 0; i < req.body.studentCount; i++) {
    const number = `name${i}`;
    const student = new Student({
      unqId: company._id,
      name: req.body[number],
      documents: documents.get(i),
    });
    students.push(student);
  }
  await Student.insertMany(students);
  await company.save();
  res.status(200).json({
    status: "success",
    message: "Students inserted successfully",
  });
});