const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const {verifyToken} = require('../middleware/verifyToken');
router.get('/tours', tourController.getTours)
router.post('/tours', verifyToken, tourController.createTour)
module.exports = router;