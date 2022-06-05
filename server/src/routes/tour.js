const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const {verifyToken} = require('../middleware/verifyToken');
router.get('/tours', verifyToken, tourController.getTours)
router.post('/tours', verifyToken, tourController.createTour)
router.get('/tours/:id', verifyToken, tourController.getTour)
router.delete('/tours/:id', verifyToken, tourController.deleteTour)
router.put('/tours/:id', verifyToken, tourController.getTours)
router.get('/tours/userTours/:id', verifyToken, tourController.getToursByUser)
module.exports = router;