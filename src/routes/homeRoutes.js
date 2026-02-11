const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.getHome);
router.get('/db-test', homeController.getDbTest);

module.exports = router;
