const express = require('express');
const router = express.Router();

const transport = require('../controllers/transport.controller');

//get all year
router.get('/',transport.gettransport);
router.post('/fees',transport.createtransport);
 router.delete('/',transport.deletetransport);
// router.put('/:id',yearOFFee.UpdateYearOFFee);

module.exports = router;