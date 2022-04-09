const express = require('express');
const router = express.Router();

const itemcontroller = require('../controllers/items.controller');

//get all year
 router.get('/',itemcontroller.getitem);
router.post('/',itemcontroller.createitem);
router.delete('/',itemcontroller.deleteitem);

module.exports = router;