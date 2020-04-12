'use strict';

let express = require('express');
let router = express.Router();

let aggregatorScripts = require('../controllers/aggregatorScripts');

router.post('/sum', aggregatorScripts.sum)
router.post('/multiply', aggregatorScripts.multiply)

module.exports = router;
