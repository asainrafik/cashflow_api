const express = require('express');
const router = express.Router();

const PlacesController = require('../controllers/places.controller');

//get all year
router.get('/',PlacesController.getplaces);
router.post('/',PlacesController.createplaces);
router.delete('/',PlacesController.deleteplaces);

module.exports = router;