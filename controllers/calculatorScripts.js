'use strict';

let bigConv = require('bigint-conversion');
let paillier = require('paillier-bigint');
let key = paillier.generateRandomKeysSync(4096);

exports.getPublicKey = async function(req, res) {
    let n = bigConv.bigintToHex(key.publicKey.n);
    let g = bigConv.bigintToHex(key.publicKey.g);
    res.status(200).send({n: n, g: g});
}

exports.decryptSum = async function(req, res) {
    let encrypted = bigConv.hexToBigint(req.body.c);
    let result = key.privateKey.decrypt(encrypted);
    result = bigConv.bigintToHex(result);
    res.status(200).send({result: result});
}
