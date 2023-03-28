const { parse } = require('dotenv');
const Express = require('express');
const router = Express.Router();
const studentController = require('../controllers/studentcontroller');
const veryficationController = require('../controllers/verifycontroller');
const userController = require('../controllers/usercontroller');

router.post(
    '/verification/insertstudent',
    studentController.upload.any(),
    studentController.insertStudent
);

router.get(
    '/verification/admin/allreq',
    veryficationController.getApis
);

router.get(
    '/verification/admin/pedningreq',
    veryficationController.getPendingApis
)

router.post(
    '/verification/admin/getstudents',
    veryficationController.getStudents
);

router.post(
    '/verification/admin/verify',
    veryficationController.verify
);

router.get(
    '/verification/admin/getpdf',
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

router.post(
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

module.exports = router;