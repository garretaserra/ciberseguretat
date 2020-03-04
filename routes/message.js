'use strict';

let express = require('express');
let router = express.Router();

let messageScript = require('../controllers/messageScripts');

router.get('', messageScript.sendMessageGet);
router.post('', messageScript.sendMessagePost);

module.exports = router;
