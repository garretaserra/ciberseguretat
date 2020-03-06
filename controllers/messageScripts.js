'use strict';

exports.sendMessageGet = async function(req, res) {
    res.status(200).json({message: req.query.message});
};

exports.sendMessagePost = async function(req, res) {
    res.status(200).json({message: req.body.message});
};
