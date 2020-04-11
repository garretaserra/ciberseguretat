'use strict';

let bigConv = require('bigint-conversion');
const got = require('got');

exports.sum = async function(req, res) {
    let n = bigConv.hexToBigint(req.body.n);
    let m1 = bigConv.hexToBigint(req.body.m1);
    let m2 = bigConv.hexToBigint(req.body.m2);
    let result = (m1 * m2) % (n**2);
    result = bigConv.bigintToHex(result);
    let response = await got.post('http://localhost:3000/calculator/decrypt', {json: {c: result}, responseType: 'json'});
    res.status(200).send({result: response.body.result});
}
