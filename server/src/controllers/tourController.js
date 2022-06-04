const Tour = require('../models/Tour');
const tourController = {
    createTour: async (req, res) => {
        const tour = req.body;
        try {
            const newTour = new Tour({
                ...tour,
                creator: req.userId,
            })
            const savedTour = await newTour.save();
            return res.status(201).json(savedTour);
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    getTours: async (req, res) => {
        try {
            const tours = await Tour.find({});
            return res.status(200).json(tours);
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}

module.exports = tourController;