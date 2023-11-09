const UserModel = require("../Models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretkey = process.env.secretkey;


module.exports = async function loginMiddleware(req, res, next) {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.send({ msg: 'Please provide all the deatails, Key names is case-sensitive.' })
        let user = await UserModel.findOne({ email });
        if (!user) return res.send({ msg: 'User Does Not Exists.' })
        bcrypt.compare(password, user.password, (err, result) => {
            if (!result) return res.send({ msg: 'Wrong Password!' });
            user.password = null;
            let token = jwt.sign({ UserData: user }, secretkey, { expiresIn: '7h' });
            req.body.token = token;
            next()
        })
    } catch (error) {
        res.send({ err: error.message })
    }
}