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
    console.log(req.body);
    const { prn, name, passingYear, branch, finalGrade, qualification, fields } = req.body; 
    const student = new StudentInfo({
        prn,
        name,
        passingYear,
        branch,
        finalGrade,
        qualification,
        fields
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
        const student = new StudentInfo({
            prn: xlData[i].PRN,
            name: xlData[i].Name,
            passingYear: xlData[i].PassoutYear,
            branch: xlData[i].Department,
            finalGrade: xlData[i].FinalGrade,
            qualification: xlData[i].Qualification,
            fields: [xlData[i].SeatNumberType, xlData[i].GradeType]
        });
        await student.save();
    }

    res.status(201).json({
        status: 'success',
        message: 'Student info inserted successfully'
    });
});


// ------------ POST REQUEST : /verification/admin/updatemultiplestudentinfo ------------ //

exports.updateMultipleStudentInfo = trycatch(async (req, res) => {
    const xlData = readStudentInfo(req.file.buffer);
    for (let i = 0; i < xlData.length; i++) {
        let student = await StudentInfo.findOne({ prn: xlData[i].PRN });
        if (!student) {
            student = new StudentInfo({
                prn: xlData[i].PRN,
                name: xlData[i].Name,
                passingYear: xlData[i].PassoutYear,
                branch: xlData[i].Department,
                finalGrade: xlData[i].FinalGrade,
                qualification: xlData[i].Qualification,
                fields: [xlData[i].SeatNumberType, xlData[i].GradeType]
            });

            await student.save();
        }
        student.name = xlData[i].Name;
        student.passingYear = xlData[i].PassoutYear;
        student.branch = xlData[i].Department;
        student.finalGrade = xlData[i].FinalGrade;
        student.qualification = xlData[i].Qualification;
        student.fields = [xlData[i].SeatNumberType, xlData[i].GradeType];
        await student.save();
    }

    res.status(200).json({
        status: 'success',
        message: 'Student info updated successfully'
    });
});


// ------------ POST REQUEST : /verification/admin/getstudentinfo ------------ //

exports.getStudentInfo = trycatch(async (req, res) => {
    const prn = req.body.prn;
    const student = await StudentInfo.findOne({ prn });
    if (!student) {
        throw new Error('Student not found');
    }
    res.status(200).json({
        status: 'success',
        message: 'Student fetched successfully',
        data: student
    });
});


// ------------ GET REQUEST : /verification/admin/getstudentinfoall ------------ //

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
    console.log(req.body);
    const prn = req.body.prn;
    const student = await StudentInfo.findOne({ prn });
    if (!student) {
        throw new Error('Student not found');
    }
    student.name = req.body.name;
    student.branch = req.body.branch;
    student.passingYear = req.body.passingYear;
    student.finalGrade = req.body.finalGrade;
    student.qualification = req.body.qualification;
    student.fields = req.body.fields;
    
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
