const express = require('express');
const router = express.Router();
const { getLibraryStats } = require('../controllers/statsController');

router.get('/stats', getLibraryStats);

module.exports = router;
