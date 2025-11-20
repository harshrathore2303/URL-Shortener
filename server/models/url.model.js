const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    visitHistory: [{
        timeStamp: {type: Number},
        city: {type: String, default: "No info"},
        country: {type: String, default: "No info"},
        device: {type: String, default: "No info"}
    }],
    qr: {
        type: String,
    },
}, {timestamps: true});

const URL = mongoose.model("url", urlSchema);

module.exports = URL;