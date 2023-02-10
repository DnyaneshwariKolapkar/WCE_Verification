const Student = require("../models/student");
const multer = require("multer");
const trycatch = require("../error/errorhandler").trycatch;

// ------------ POST REQUEST : /verification/insertstudent ------------ //

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./src/public/students/`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
exports.upload = multer({ storage: storage });

exports.insertStudent =
  trycatch(async (req, res) => {
    let gradecards = [];
    console.log(req.files);
    console.log(req.body);
    for (let i = 0; i < 8; i++) {
      gradecards.push(req.files.gradeCard[i].filename);
    }
    const student = new Student({
      name: req.body.name,
      orgEmail: req.body.orgEmail,
      photo: req.files.photo[0].filename,
      identity: req.files.identity[0].filename,
      cert: req.files.cert[0].filename,
      gradeCards: gradecards
    });
    await student.save();
    res.status(200).json({
      message: "Student inserted successfully",
      data: student,
    });
  });