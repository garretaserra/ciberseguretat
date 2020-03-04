'use strict';

let express = require('express');
let router = express.Router();

let messageScript = require('../controllers/messageScripts');

router.get('', messageScript.sendMessage);
router.post('', messageScript.sendMessage);

module.exports = router;
