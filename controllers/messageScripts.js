'use strict';

exports.sendMessage = async function(req, res) {
    res.status(200).send(req.body.message)
};
