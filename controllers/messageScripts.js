'use strict';

exports.sendMessageGet = async function(req, res) {
    res.setHeader('content-type', 'text/plain');
    res.status(200).send(req.query.message)
};

exports.sendMessagePost = async function(req, res) {
    res.setHeader('content-type', 'text/plain');
    res.status(200).send(req.body.message);
};
