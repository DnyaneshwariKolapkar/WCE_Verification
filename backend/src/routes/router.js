const { parse } = require('dotenv');
const Express = require('express');
const router = Express.Router();
const studentController = require('../controllers/studentcontroller');
const Student = require("../models/student");

router.post(
    '/verification/insertstudent',
    studentController.upload.any(),
    studentController.insertStudent
)

module.exports = router;