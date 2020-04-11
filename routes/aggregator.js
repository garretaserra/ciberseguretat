'use strict';

let express = require('express');
let router = express.Router();

let aggregatorScripts = require('../controllers/aggregatorScripts');

router.get('/multiply', aggregatorScripts.multiply)

module.exports = router;
