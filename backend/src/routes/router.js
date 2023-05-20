const Express = require('express');
const router = Express.Router();
const studentController = require('../controllers/studentcontroller');
const veryficationController = require('../controllers/verifycontroller');
const userController = require('../controllers/usercontroller');
const infocontroller = require('../controllers/infocontroller');


// ------------ client routes ------------ //

router.post(
    '/verification/insertstudent',
    studentController.upload.any(),
    studentController.insertStudent
);


// ------------ admin routes ------------ //

router.get(
    '/verification/admin/allreq',
    userController.auth,
    veryficationController.getApis
);

router.get(
    '/verification/admin/pendingreq',
    userController.auth,
    veryficationController.getPendingApis
)

router.get(
    '/verification/admin/studentsrequests/:tag',
    userController.auth,
    veryficationController.getStudentRequests
);

router.post(
    '/verification/admin/getstudents',
    userController.auth,
    veryficationController.getStudents
);

router.post(
    '/verification/admin/verify',
    userController.auth,
    veryficationController.verify
);

router.post(
    '/verification/admin/verifystudent/:status',
    userController.auth,
    veryficationController.verifyStudent
);

router.post(
    '/verification/admin/getpdf',
    userController.auth,
    veryficationController.getpdf
);

router.post(
    '/verification/login',
    userController.login
);

router.post(
    '/verification/admin/createuser',
    userController.auth,
    userController.createUser
)

router.get(
    '/verification/admin/getusers',
    userController.auth,
    userController.getUsers
)

router.post(
    '/verification/admin/deleteuser',
    userController.auth,
    userController.deleteUser
)

router.post(
    '/verification/admin/updateuser',
    userController.auth,
    userController.updateUser
)

router.post(
    '/verification/resetpassword',
    userController.resetPassword
)

router.post(
    '/verification/changepassword',
    userController.changePassword
)

// ------------ studentinfo routes ------------ //

router.post(
    '/verification/admin/insertstudentinfo',
    userController.auth,
    infocontroller.insertStudentInfo
);

router.post(
    '/verification/admin/insertmultiplestudentinfo',
    userController.auth,
    infocontroller.upload.single('file'),
    infocontroller.insertMultipleStudentInfo
);

router.post(
    '/verification/admin/updatemultiplestudentinfo',
    userController.auth,
    infocontroller.upload.single('file'),
    infocontroller.updateMultipleStudentInfo
)

router.post(
    '/verification/admin/getstudentinfo',
    userController.auth,
    infocontroller.getStudentInfo
);

router.get(
    '/verification/admin/getstudentinfoall',
    userController.auth,
    infocontroller.getAllStudentsInfo
);

router.post(
    '/verification/admin/updatestudentinfo',
    userController.auth,
    infocontroller.updateStudentInfo
);

router.post(
    '/verification/admin/deletestudentinfo',
    userController.auth,
    infocontroller.deleteStudentInfo
);


module.exports = router;