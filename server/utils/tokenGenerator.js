const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
function tokenGenerator(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
        name: user.name
    }, process.env.My_Key, {expiresIn: "1d"});
}

module.exports = tokenGenerator;