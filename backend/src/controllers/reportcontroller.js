const Student = require("../models/student");
const Company = require("../models/company");
const xlsx = require("xlsx");
const trycatch = require("../error/errorhandler").trycatch;


// ------------ POST REQUEST : /verification/report/:tag ------------ //

exports.createReport = trycatch(async (req, res) => {

    const tag = req.params.tag;
    if (tag === "annual") {
        const year = req.body.year;
        let companies = await Company.find({
            createdAt: {
                $gte: new Date(year, 0, 1), $lt: new Date(year, 11, 31)
            }
        });

        let students = await Student.find({
            createdAt: {
                $gte: new Date(year, 0, 1), $lt: new Date(year, 11, 31)
            }
        });

        students = students.map((student) => {
            const company = companies.find((company) => company._id.toString() === student.unqId.toString());
            console.log(company);
            return {
                "Agency Name": company.orgName,
                "Agency Email": company.orgEmail,
                "Student Name": student.name,
            };
        });

        companies = companies.map((company) => {
            return {
                "Agency Name": company.orgName,
                "Agency Email": company.orgEmail,
                "Agency Address": company.orgAddress,
                "Students Verified": company.studentsCount,
                "Mail Sent": company.isVerified ? "Yes" : "No",
                "Date of Application": company.createdAt,
                "Date of Verification": company.isVerified ? company.updatedAt : "Not Verified",
            };
        });

        

        const wb = xlsx.utils.book_new();
        const ws1 = xlsx.utils.json_to_sheet(companies);
        const ws2 = xlsx.utils.json_to_sheet(students);
        xlsx.utils.book_append_sheet(wb, ws1, "Companies");
        xlsx.utils.book_append_sheet(wb, ws2, "Students");
        xlsx.writeFile(wb, `./src/public/reports/${year}.xlsx`);


        res.status(200).json({
            status: "success",
            students: students,
            companies: companies,
        });
    }
});