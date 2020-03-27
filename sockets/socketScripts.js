'use strict';
let io = require('../app').io;

let userList = [];

function removeUser(userName) {
    userList.filter(function (value) {
        if(!value===userName)
            return value;
    })
}

exports.login = async function(username) {
    userList.push(username);
    console.log(username, ' has logged in')
};

exports.disconnect = async function() {

};

exports.getConnected = async function() {
    console.log(userList.toString());
    io.emit(userList.toString())
};

