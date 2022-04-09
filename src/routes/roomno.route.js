const express = require('express');
const router = express.Router();

const RoomController = require('../controllers/roomno.controller');

//get all year
router.get('/',RoomController.getroomno);
router.post('/',RoomController.createroom);
router.delete('/',RoomController.deleteroom);

module.exports = router;