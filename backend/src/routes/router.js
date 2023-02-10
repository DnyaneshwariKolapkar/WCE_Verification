const Express = require('express');
const router = Express.Router();
const studentController = require('../controllers/studentcontroller');

router.post(
    '/verification/insertstudent',
    studentController.upload.fields([
        { name: 'photo', maxCount: 1 },
        { name: 'identity', maxCount: 1 },
        { name: 'cert', maxCount: 1 },
        // upload array of files gradeCard
        { name: 'gradeCard', maxCount: 8 }
    ]),
    studentController.insertStudent
)

module.exports = router;