const express = require('express');
const {handleGenerateNewShortURL, handleGetAnalytics, getAllUrls, getTotalClicks, deleteUrl} = require('../controllers/url.controller')
const verifyJWT = require('../utils/verifyJWT');
const multer = require('multer');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', verifyJWT, upload.single('qr'), handleGenerateNewShortURL);
router.delete('/delete/:deleteId', verifyJWT, deleteUrl);
router.get('/getAll', verifyJWT, getAllUrls);
router.get('/totalClick', verifyJWT, getTotalClicks);
router.get('/analytics/:shortId', verifyJWT, handleGetAnalytics)

module.exports = router;