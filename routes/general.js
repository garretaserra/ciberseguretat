'use strict';

let express = require('express');
let router = express.Router();

let generalScripts = require('../controllers/generalScripts');

router.get('', generalScripts.sendMessageGet);
router.post('', generalScripts.sendMessagePost);
router.get('/pubKey', generalScripts.getPublicKey);
router.post('/sign', generalScripts.sign);

module.exports = router;
