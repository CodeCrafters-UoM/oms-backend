const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');

// router.get('/getitems', itemController.getAllItems);
router.get('/getitem', itemController.getItemById);

module.exports = router;