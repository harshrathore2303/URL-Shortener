const { customAlphabet } = require('nanoid');
const URL = require('../models/url.model.js');

async function handleGenerateNewShortURL(req, res) {
    try {
        const url = req.body.url;
        if (!url){
            return res.status(400).json({message: 'url is required'});
        }
        const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const nanoid = customAlphabet(alphabet, 7);
        const shortenURL = nanoid();
        await URL.create({
            shortId: shortenURL,
            redirectURL: url,
            visitHistory: []
        })

        return res.status(201).json({id: shortenURL}); 

    } catch (error) {
        
    }
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});

    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory});
}

module.exports = {handleGenerateNewShortURL, handleGetAnalytics};