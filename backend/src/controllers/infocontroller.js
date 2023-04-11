const StudentInfo = require('../models/studentinfo');
const trycatch = require('../error/errorhandler').trycatch;
const xlsx = require('xlsx');
const multer = require('multer');


// ------------ Read student info from excel file ------------ //

const readStudentInfo = (file) => {
    const workbook = xlsx.read(file, { type: 'buffer' });
    const sheet_name_list = workbook.SheetNames;
    for (let i = 0; i < sheet_name_list.length; i++) {
        const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[i]]);
        return xlData;
    }
};


// ------------ Multer storage ------------ //

exports.upload = multer({
    storage: multer.memoryStorage()
});


// ------------ POST REQUEST : /verification/insertstudent ------------ //

exports.insertStudentInfo = trycatch(async (req, res) => {
    const { prn, name, grade, passingYear, branch } = req.body;
    const student = new StudentInfo({
        prn,
        name,
        passingYear,
        branch,
        grade
    });
    await student.save();
    res.status(201).json({
        status: 'success',
        message: 'Student info inserted successfully'
    });
});


// ------------ POST REQUEST : /verification/admin/insertmultiplestudentinfo ------------ //

exports.insertMultipleStudentInfo = trycatch(async (req, res) => {
    const xlData = readStudentInfo(req.file.buffer);
    for (let i = 0; i < xlData.length; i++) {
        const grade = [xlData[i].grades1, xlData[i].grades2, xlData[i].grades3, xlData[i].grades4, xlData[i].grades5, xlData[i].grades6, xlData[i].grades7, xlData[i].grades8];
        const student = new StudentInfo({
            prn: xlData[i].prn,
            name: xlData[i].name,
            passingYear: xlData[i].passingYear,
            branch: xlData[i].branch,
            grade: grade
        });
        await student.save();
    }
    res.status(201).json({
        status: 'success',
        message: 'Student info inserted successfully'
    });
});


// ------------ POST REQUEST : /verification/admin/getstudentinfo ------------ //

exports.getStudentInfo = trycatch(async (req, res) => {
    const prn = req.body.prn;
    const student = await StudentInfo.findOne({ prn });
    res.status(200).json({
        status: 'success',
        message: 'Student fetched successfully',
        data: student
    });
});


// ------------ GET REQUEST : /verification/admin/getallstudentsinfo ------------ //

exports.getAllStudentsInfo = trycatch(async (req, res) => {
    const students = await StudentInfo.find();
    res.status(200).json({
        status: 'success',
        message: 'All students fetched successfully',
        data: students
    });
});


// ------------ POST REQUEST : /verification/admin/updatestudentinfo ------------ //

exports.updateStudentInfo = trycatch(async (req, res) => {
    const prn = req.body.prn;
    const student = await StudentInfo.findOne({ prn });
    if (!student) {
        res.status(404).json({
            status: 'fail',
            message: 'Student not found'
        });
    }
    student.name = req.body.name;
    student.branch = req.body.branch;
    student.passingYear = req.body.passingYear;
    student.grade = req.body.grade;
    await student.save();
    res.status(200).json({
        status: 'success',
        message: 'Student updated successfully',
        data: student
    });
});


// ------------ POST REQUEST : /verification/admin/deletestudentinfo ------------ //

exports.deleteStudentInfo = trycatch(async (req, res) => {
    const prn = req.body.prn;
    const student = await StudentInfo.findOne({ prn });
    if (!student) {
        throw new Error('Student not found');
    }
    await student.remove();
    res.status(200).json({
        status: 'success',
        message: 'Student deleted successfully',
        data: student
    });
});
