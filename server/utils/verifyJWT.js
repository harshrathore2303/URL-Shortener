const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

async function verifyJWT (req, res, next){
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            return res.status(401).json({message: "Unauthorized request"});
        }
        
        const decodedToken = jwt.verify(token, process.env.My_Key);
        
        const user = await User.findById(decodedToken?._id).select("-password -profile_pic")
        
        console.log(token)
        if (!user) {
            return res.status(401).json({message: "Invalid Access Token"})
        }
    
        req.user = user;
        next()
    } catch (error) {
        return res.status(500).json({message: error?.message || "Internal server error"})
    }
}

module.exports = verifyJWT;
