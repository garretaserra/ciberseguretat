'use strict';

exports.test = async function (req, res){
    res.status(200).send('It works');
};

exports.getmessage = async function (req, res){
    res.status(200).send(req.body);
};

exports.postmessage = async function (req, res){
    res.status(200).send(req.body);
};
