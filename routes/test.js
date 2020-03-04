let express = require('express');
let router = express.Router();

let testScripts = require('../controllers/testScripts');

router.get('/get', testScripts.test);
router.get('/getmsg',testScripts.getmessage);

router.post('/post', testScripts.test);
router.post('/postmsg',testScripts.postmessage);


module.exports = router;
