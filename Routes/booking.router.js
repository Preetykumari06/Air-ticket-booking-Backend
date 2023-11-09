const express = require('express');
const BookingModel = require('../Models/Booking.Model');
const BookingRouter = express.Router();

BookingRouter.get('/', (req, res) => {
    res.send({ msg: 'Welcome to Booking Router' })
})

BookingRouter.post('/booking', async (req, res) => {
    const { user, flight } = req.body;
    if (!user || !flight) return res.send({ msg: 'Please Provide The User And Flight ID ( user, flight )' })
    try {
        let booking = new BookingModel(req.body);
        await booking.save();
        res.status(201).send({ msg: 'Booking Successfully', booking })
    } catch (error) {
        res.send({ err: error.message })
    }
});

BookingRouter.get('/dashboard', async (req, res) => {
    try {
        let BookingData = await BookingModel.find().populate('user').populate('flight');
        res.status(200).send({ BookingData })
    } catch (error) {
        res.send({ err: error.message })
    }
})

BookingRouter.get('/dashboard/:id', async (req, res) => {
    try {
        if (!req.params.id) return res.send({ msg: 'Please Provide ID' })
        let BookingData = await BookingModel.findById(req.params.id).populate('user').populate('flight');
        res.status(200).send({ msg: `Booking data of ID: ${req.params.id}`, BookingData })
    } catch (error) {
        res.send({ err: error.message })
    }
})

BookingRouter.patch('/dashboard/:id', async (req, res) => {
    try {
        if (!req.params.id) return res.send({ msg: 'Please Provide ID' })
        const { user, flight } = req.body;
        if (user || flight) {
            let BookingData = await BookingModel.findByIdAndUpdate(req.params.id, req.body);
            res.status(204).send({ msg: `Booking of ID: ${req.params.id} is Updated`, BookingData })
        } else {
            res.send({ msg: 'Please Provide User || Flight in body' })
        }
    } catch (error) {
        res.send({ err: error.message })
    }
})

BookingRouter.delete('/dashboard/:id', async (req, res) => {
    try {
        if (!req.params.id) return res.send({ msg: 'Please Provide ID' })
        let BookingData = await BookingModel.findByIdAndDelete(req.params.id);
        res.status(202).send({ msg: `Booking of ID: ${req.params.id} is Deleted.` })

    } catch (error) {
        res.send({ err: error.message })
    }
})


module.exports = BookingRouter;