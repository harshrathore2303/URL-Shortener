const jwt = require('jsonwebtoken');

function tokenGenerator(user){
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, "mykey", {expiresIn: "1d"});
}

module.exports = tokenGenerator;