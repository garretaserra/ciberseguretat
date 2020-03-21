'use strict';
let rsa = require('../rsa');
let crypto = new rsa();

exports.sendMessageGet = async function(req, res) {
    console.log(crypto.get().publicKey);
    res.status(200).json({message: req.query.message});
};

exports.sendMessagePost = async function(req, res) {
    let rsa = new rsa();
    console.log(rsa.rsa.publicKey);
    res.status(200).json({message: req.body.message});
};
