const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function verifyJWT (req, res, next){
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return res.status(401).json({message: "Unauthorized request"});
        }
    
        const decodedToken = jwt.verify(token, "mykey")
        
        const user = await User.findById(decodedToken?._id).select("-password")
    
        if (!user) {
            return res.status(401).json({message: "Invalid Access Token"})
        }
    
        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({message: error?.message})
    }
}

module.exports = verifyJWT;
