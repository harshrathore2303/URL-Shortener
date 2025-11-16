const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/tokenGenerator');

async function signup(req, res){
    try {
        const {email, password} = req.body;

        if (email.trim() === ""){
            return res.status(404).json({message: "email is invalid"});
        }

        if (password.length < 6){
            return res.status(404).json({message: "password should be minimum length of 6"});
        }

        const encryptedPass = bcrypt.hashSync(password, 10);

        const user = await User.create({
            email: email,
            password: encryptedPass
        })

        return res.status(201).json({message: "User Created"});
    } catch (error) {

    }
}


async function login(req, res) {
    try {
        const {email, password} = req.body;
        if (email.trim() === ""){
            return res.status(404).json({message: "email is invalid"});
        }

        if (password.length < 6){
            return res.status(404).json({message: "password should be minimum length of 6"});
        }

        const user = await User.findOne(email);
        if (!user){
            return res.status(404).json({message: "user does not exist in database"});
        }
        
        const decryptedPass = bcrypt.compareSync(password, user.password)

        const token = generateToken(user);

        return res.cookie("token", token, {httpOnly: true, secure: true}).status(201).json({message: "login success"});
    } catch (error) {
        
    }
}

async function logout(req, res) {
    try {
        return res.clearCookie('token').status(200).json({message: "logged out"});
    } catch (error) {
        
    }
}
module.exports = {signup, login, logout};