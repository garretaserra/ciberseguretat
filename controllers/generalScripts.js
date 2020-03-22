'use strict';

let bigConv = require('bigint-conversion');
let rsa = require('../rsa');
let crypto = new rsa();

exports.sendMessageGet = async function(req, res) {
    res.status(200).json({message: req.query.message});
};

exports.sendMessagePost = async function(req, res) {
    res.status(200).json({message: req.body.message});
};

exports.getPublicKey = async function(req, res) {
    let n = bigConv.bigintToHex(crypto.get().publicKey.n);
    let e = bigConv.bigintToHex(crypto.get().publicKey.e);
    res.status(200).json({e:e,n:n});
};

exports.sign = async function(req, res) {
    let message = bigConv.hexToBigint(req.body);
    let signature = crypto.get().sign(message);
    res.status(200).json({signature: bigConv.bigintToHex(signature)});
};
