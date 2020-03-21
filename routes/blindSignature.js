'use strict';

let express = require('express');
let router = express.Router();

let blindSignature = require('../controllers/blindSignatureScripts');

router.post('/sign', blindSignature.blindSignatureSign);

module.exports = router;
