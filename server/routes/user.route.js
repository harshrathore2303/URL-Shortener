const express = require('express');
const { signup, login, logout, getCurrentUser } = require('../controllers/user.controller');
const verifyJWT = require('../utils/verifyJWT');

const router = express();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/currUser", verifyJWT, getCurrentUser)

module.exports = router;