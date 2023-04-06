const Student = require("../models/student");
const Company = require("../models/company");
const xlsx = require("xlsx");
const trycatch = require("../error/errorhandler").trycatch;


// ------------ POST REQUEST : /verification/report/:tag ------------ //

exports.createReport = trycatch(async (req, res) => {
    console.log(req.body);
    const tag = req.params.tag;
    console.log(tag);
    if (tag === "annual") {
        const year = req.body.year;
        const companies = await Company.find({
            createdAt: {
                $gte: new Date(year, 0, 1), $lt: new Date(year, 11, 31)
            }
        },
            {
                orgName: 1,
                orgEmail: 1,
                orgAddress: 1,
                email: 1,
                studentsCount: 1,
                isVerified: 1,
            }
        )
        for (let i = 0; i < companies.length; i++) {
            const students = await Student.find({
                unqId: companies[i]._id
            },
                {
                    name: 1,
                    isVerified: 1
                })
            companies[i].students = students;
        }
        const data = [];
        for (let i = 0; i < companies.length; i++) {
            const obj = {
                "Company Name": companies[i].orgName,
                "Company Email": companies[i].orgEmail,
                "Company Address": companies[i].orgAddress,
                "Company Contact": companies[i].email,
                "Students Count": companies[i].studentsCount,
                "Verification Status": companies[i].isVerified,
                "Students": companies[i].students
            }
            data.push(obj);
        }
        res.status(200).json({
            status: "success",
            data: data,
        });
    }
});