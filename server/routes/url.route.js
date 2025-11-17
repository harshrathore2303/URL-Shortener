const express = require('express');
const {handleGenerateNewShortURL, handleGetAnalytics, getAllUrls, getTotalClicks, deleteUrl} = require('../controllers/url.controller')
const verifyJWT = require('../utils/verifyJWT');

const router = express.Router();

router.post('/', handleGenerateNewShortURL);
router.post('/delete', deleteUrl);
router.get('/getAll', verifyJWT, getAllUrls);
router.get('/totalClick', getTotalClicks);
router.get('/analytics/:shortId', verifyJWT, handleGetAnalytics)

module.exports = router;