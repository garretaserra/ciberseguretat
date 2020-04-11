'use strict';

let bigConv = require('bigint-conversion');
let paillier = require('paillier-bigint');
let key = paillier.generateRandomKeysSync(4096);

exports.getPublicKey = async function(req, res) {
    let n = bigConv.bigintToHex(key.publicKey.n);
    let g = bigConv.bigintToHex(key.publicKey.g);
    res.status(200).send({n: n, g: g})
}

exports.decrypt = async function(req, res) {
    let encrypted = bigConv.hexToBigint(req.body.encrypted);
    let result = key.privateKey.decrypt(encrypted);
    res.status(200).send(result);
}
