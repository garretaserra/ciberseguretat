'use strict';

let bigConv = require('bigint-conversion');
let cryptoUtils = require('bigint-crypto-utils');

exports.multiply = async function(req, res) {
    let n = bigConv.hexToBigint(req.body.n);
    let m1 = bigConv.hexToBigint(req.body.m1);
    let m2 = bigConv.hexToBigint(req.body.m2);
    let result = (m1 * m2) % n;
    res.status(200).send(result);
}
