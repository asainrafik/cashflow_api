const express = require('express');
const router = express.Router();

const stopping = require('../controllers/stopping.controller');

//get all year
router.get('/',stopping.getstopping);
router.post('/',stopping.createstopping);
router.delete('/',stopping.deletestopping);
// router.put('/:id',yearOFFee.UpdateYearOFFee);

module.exports = router;