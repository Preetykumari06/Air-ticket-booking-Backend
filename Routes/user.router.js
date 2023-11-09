const express = require('express');
const UserModel = require('../Models/UserModel');
const loginMiddleware = require('../Middlewares/loginMiddleware');
const userRegistrationMiddleware = require('../Middlewares/userRegistration.middleware');
const UserRouter = express.Router();
require('dotenv').config()



UserRouter.get('/', (req, res) => {
    res.send({ msg: 'Welcome To User Router.' })
})

UserRouter.post('/register', userRegistrationMiddleware, async (req, res) => {
    try {
        let user = new UserModel({ name: req.body.name, email: req.body.email, password: req.body.password });
        await user.save();
        res.status(201).send({ msg: 'User Registered Succesfully.' })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
});

UserRouter.post('/login', loginMiddleware, (req, res) => {
    try {
        res.status(201).send({ msg: 'Log In Success', token: req.body.token })
    } catch (error) {
        res.send({ err: error.message })
    }
})



module.exports = UserRouter;