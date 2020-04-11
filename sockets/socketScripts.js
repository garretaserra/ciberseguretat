'use strict'
let sha = require('object-sha');
let myRsa = require('my_rsa');
let rsa = require('../rsa');
let crypto = new rsa();
let bigint_conversion = require('bigint-conversion');
let bigintToHex = bigint_conversion.bigintToHex;
let hexToBigint = bigint_conversion.hexToBigint;

exports.socket = function(io) {
    let userList = [];
    io.on('connection', (socket) => {
        socket.on('login', (username, publicKey) => {
            userList.push({username: username, id: socket.id, publicKey: JSON.parse(publicKey)});
            console.log(username, ' has logged in');
            io.emit('userList', JSON.stringify(userList));
        });

        socket.on('disconnect', (reason) => {
            // Remove user from list
            userList = userList.filter((user) => {
                if (user.id !== socket.id) {
                    console.log('User ', user.username, ' disconnected');
                    return user;
                }
            });
            // Update list to users
            io.emit('userList', JSON.stringify(userList));
        });

        socket.on('proxy', (destination, message) => {
            io.to(destination).emit('proxy', message);
        });

        socket.on('publishNoRepudiation', async (message) => {

            // Check timestamp:
            const remoteTimestamp = parseInt(message.body.timestamp);
            const localTimestamp = parseInt(Date.now());
            const maxDiffTime = 2 * 60 * 1000; // minutes * seconds/minute * milliseconds = maximum allowable time diference in milliseconds
            const calcDiffTime = (localTimestamp - remoteTimestamp);
            if (calcDiffTime < 0 || calcDiffTime > maxDiffTime) {
                console.log('Timestamp error ' + calcDiffTime + ' ms.');
                return;
            }

            // Check signature Pko
            let hash = await sha.digest(message.body, 'SHA-256');
            let key;
            userList.forEach((user) => {
                if (user.username === message.body.origin)
                    key = user.publicKey;
            });
            let sig = myRsa.verify(hexToBigint(message.signature), hexToBigint(key.e), hexToBigint(key.n));
            if (hash !== bigintToHex(sig)) {
                console.log('Verification of Pko failed', hash);
                return;
            }

            message.messageType = 'noRepudiation4';
            message.body.destination = message.body.origin;
            message.body.origin = 'TTP';

            // Sign message
            hash = await sha.digest(message.body, 'SHA-256');
            const signature = crypto.get().sign(hexToBigint(hash));
            message.signature = bigintToHex(signature);

            io.emit('publish', message);
        });
    });
}
