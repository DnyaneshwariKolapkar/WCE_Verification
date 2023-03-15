const { parse } = require('dotenv');
const Express = require('express');
const router = Express.Router();
const studentController = require('../controllers/studentcontroller');
const veryficationController = require('../controllers/verifycontroller');

router.post(
    '/verification/insertstudent',
    studentController.upload.any(),
    studentController.insertStudent
);

router.get(
    '/verification/admin/allreq',
    veryficationController.getApis
);

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

module.exports = router;