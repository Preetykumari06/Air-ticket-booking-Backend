const express = require('express');
const FlightModel = require('../Models/Flight.Model');
const AddFlightMiddleware = require('../Middlewares/AddFlightMiddleware');
const FlightRouter = express.Router();

FlightRouter.get('/', (req, res) => {
    res.send({ msg: 'Welcome to filght Router' })
})

FlightRouter.get('/flights', async (req, res) => {
    try {
        let flights = await FlightModel.find();
        if (!flights) return res.send({ msg: "No Flight is Available" })
        res.status(200).send({ mag: 'All Fligths Data', flights })
    } catch (error) {
        res.send({ err: error.message })
    }
})


FlightRouter.get('/flights/:id', async (req, res) => {
    try {
        if(!req.params.id) return res.send({msg:'Please Provide ID'})
        let flight = await FlightModel.findById(req.params.id);
        if (!flight) return res.send({ msg: "No Flight is Available" })
        res.status(200).send({ msg: `Flight Data for ID : ${req.params.id}`, flight })
    } catch (error) {
        res.send({ err: error.message })
    }
})


FlightRouter.patch('/flights/:id', async (req, res) => {
    try {
        if(!req.params.id) return res.send({msg:'Please Provide ID'})
        let flight = await FlightModel.findByIdAndUpdate(req.params.id, req.body);
        if (!flight) return res.send({ msg: "No Flight is Available" })
        res.status(204).send({ msg: `Flight Data for ID : ${req.params.id} is updated`, flight })
    } catch (error) {
        res.send({ err: error.message })
    }
})

FlightRouter.delete('/flights/:id', async (req, res) => {
    try {
        if(!req.params.id) return res.send({msg:'Please Provide ID'})
        let flight = await FlightModel.findByIdAndDelete(req.params.id, req.body);
        res.status(202).send({ msg: `Flight Data for ID : ${req.params.id} is deleted` })
    } catch (error) {
        res.send({ err: error.message })
    }
})

FlightRouter.post('/flights',AddFlightMiddleware, async (req, res) => {
    try {
        let flight = new FlightModel(req.body);
        await flight.save();
        res.status(201).send({ msg: 'New Flight registered', flight })
    } catch (error) {
        res.send({ err: error.message })
    }
})
module.exports = FlightRouter;