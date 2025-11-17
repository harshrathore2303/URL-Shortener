const { customAlphabet } = require('nanoid');
const URL = require('../models/url.model.js');
const QRCode = require("qrcode");

async function handleGenerateNewShortURL(req, res) {
    try {
        const {url, title, qr} = req.body;
        if (!url){
            return res.status(400).json({message: 'url is required'});
        }
        const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const nanoid = customAlphabet(alphabet, 7);
        const shortenURL = nanoid();
        // const qr = await QRCode.toDataURL(finalUrl);
        await URL.create({
            title,
            shortId: shortenURL,
            redirectURL: url,
            visitHistory: [],
            qr
        })

        return res.status(201).json({id: shortenURL}); 

    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}

async function handleGetAnalytics(req, res) {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({shortId});
    
        return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}

async function getAllUrls(req, res) {
    try {
        const userId = req.user._id;
        const urls = await URL.find({userId});

        return res.status(200).json(urls);
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}

async function getTotalClicks(req, res){
    try {
    const urls = await URL.find({ userId: req.user._id });

    const totalClicks = urls.reduce(
      (sum, url) => sum + url.visitHistory.length,
      0
    );

    return res.status(200).json({ totalClick: totalClicks });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteUrl(req, res) {
    try {
        await URL.findByIdAndDelete({_id: req.body._id});
        return res.status(200).json({message: "Deleted"});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {handleGenerateNewShortURL, handleGetAnalytics, getAllUrls, getTotalClicks, deleteUrl};