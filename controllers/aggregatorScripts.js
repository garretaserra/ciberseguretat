'use strict';
let paillierBigInt = require('paillier-bigint');
let bigConv = require('bigint-conversion');
const got = require('got');

let publicKey;
getKey();

async function getKey(){
    let response = (await got('http://localhost:3000/calculator/getKey'));
    response = JSON.parse(response.body);
    let n = response.n;
    let g = response.g;
    publicKey = new paillierBigInt.PublicKey(bigConv.hexToBigint(n),bigConv.hexToBigint(g));
}


exports.sum = async function(req, res) {
    let numbers = req.body.numbers;
    let nums = [1n];

    numbers.forEach((num)=>{
        nums.push(BigInt(bigConv.hexToBigint(num)));
    })
    let result = publicKey.addition(...nums);
    result = bigConv.bigintToHex(result);
    let response = await got.post('http://localhost:3000/calculator/decrypt', {json: {c: result}, responseType: 'json'});
    res.status(200).send({result: response.body.result});
}

exports.multiply = async function(req, res) {
    let n = bigConv.hexToBigint(req.body.n);
    let m1 = bigConv.hexToBigint(req.body.m1);
    let m2 = bigConv.hexToBigint(req.body.m2);
    let result = (m1 ** m2) % (n**BigInt(2));
    result = bigConv.bigintToHex(result);
    let response = await got.post('http://localhost:3000/calculator/decrypt', {json: {c: result}, responseType: 'json'});
    res.status(200).send({result: response.body.result});
}



