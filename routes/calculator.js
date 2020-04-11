'use strict';

let express = require('express');
let router = express.Router();

let calculatorScripts = require('../controllers/calculatorScripts');

router.get('/getKey', calculatorScripts.getPublicKey);
router.post('/decrypt', calculatorScripts.decrypt);

module.exports = router;
