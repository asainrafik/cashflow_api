const router = require("express").Router(); 
const studentcontroller = require('../controllers/student_discount.controller');

router.post('/',studentcontroller.getAllStudent);
router.put('/:id',studentcontroller.Updatediscount);

module.exports = router ;