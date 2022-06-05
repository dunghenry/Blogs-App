const Tour = require("../models/Tour");
const mongoose = require("mongoose");
const tourController = {
    createTour: async (req, res) => {
        const tour = req.body;
        try {
            const newTour = new Tour({
                ...tour,
                creator: req.userId,
            });
            const savedTour = await newTour.save();
            return res.status(201).json(savedTour);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    getTours: async (req, res) => {
        try {
            const tours = await Tour.find({});
            return res.status(200).json(tours);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    getTour: async (req, res) => {
        const id = req.params.id;
        try {
            const tour = await Tour.findById(id);
            return res.status(200).json(tour);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    getToursByUser: async (req, res) => {
        const {id} = req.params;
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ message: "User does'n exits!" });
            }
            const userTours = await Tour.find({creator: id});
            return res.status(200).json(userTours);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    deleteTour: async (req, res) => {
        const {id} = req.params;
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({message: `No tour exits with id :  ${id}`});
            }
            await Tour.findByIdAndDelete(id);
            return res.status(200).json("Tour deleted successfully!");
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },
    updateTour: async (req, res) => {
        const { id } = req.params;
        const { title, description, creator, imageFile, tags } = req.body;
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({message: `No tour exits with id :  ${id}`});
            }
            const updateTour = {
                creator, 
                description,
                title,
                tags,
                imageFile
            }
            const savedUpdateTour = await Tour.findByIdAndUpdate(id, updateTour, {new: true});
            return res.status(200).json(savedUpdateTour);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },
};

module.exports = tourController;