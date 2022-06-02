const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
router.post('/toures/create', tourController.createTour)
module.exports = router;