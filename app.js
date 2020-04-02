'use strict';
//Import libraries
let express = require('express');
let http = require('http');
let socketIO = require('socket.io');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');
let errorHandler = require('errorhandler');
let myRsa = require('my_rsa');
let socketScripts = require('./sockets/socketScripts');
let sha = require('object-sha');

//Import routes
let testRouter = require('./routes/test');
let generalRouter = require('./routes/general');

//Server variable initialization
const port = 3000;
let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(errorHandler());

app.use('', generalRouter);
app.use('/test', testRouter);

//Make app listen on port 3000
const server = app.listen(port);
console.log('Server listening on port 3000');
module.exports = app;

// Socket initialisation
let io = socketIO(server);
let userList = [];
io.on('connection', (socket) => {
    socket.on('login', (username, publicKey)=>{
        userList.push({username: username, id: socket.id, publicKey: JSON.parse(publicKey)});
        console.log(username, ' has logged in');
        io.emit('userList', JSON.stringify(userList));
    });

    socket.on('disconnect', (reason)=>{
        // Remove user from list
        userList = userList.filter((user)=>{
            if(user.id !== socket.id) {
                console.log('User ', user.username, ' disconnected');
                return user;
            }
        });
        // Update list to users
        io.emit('userList', JSON.stringify(userList));
    });

    socket.on('proxy', (destination, message)=>{

        async function worker(destination, message) {
            const hash = await sha.digest(message.body, 'SHA-256');
            console.log('Received hash: ' + message.signature);
            console.log('Hash: ' + hash);
            io.to(destination).emit('proxy', message);
        }

        worker(destination, message);
    });

    socket.on('publishNoRepudiation', (message)=>{
        //TODO: Reformat message

        message.messageType = 'noRepudiation4';
        message.body.originator = message.body.origin;
        message.body.origin = 'TTP';

        message.signature = 'Signature of TTP';

       io.emit('publish', message);
    });
});

//Mongo database connection
// mongoose.connect("mongodb://localhost:27017/erasmus",{
//     useNewUrlParser: true,
//     reconnectTries : Number.MAX_VALUE,
//     autoReconnect : true,
//     useUnifiedTopology: true,
//     reconnectInterval: 500
// }).then(() =>{
//     console.log('Connection to the database successful');
// }).catch(err =>{
//     console.log(`Database error: ${err.message}`);
// });
//
// //Handle database connection events
// mongoose.connection.on('reconnected', () => {
//     console.log('Database reconnected');
// });
// mongoose.connection.on('error', (err) => {
//     console.log(`Database error: ${err.message}`);
// });
// mongoose.connection.on('disconnected', () => {
//     console.log('Database disconnected');
//     //If database is disconnected it wil try again
//     mongoose.connect("mongodb://localhost:27017/erasmus",{
//         useNewUrlParser: true,
//         reconnectTries : Number.MAX_VALUE,
//         autoReconnect : true,
//         useUnifiedTopology: true,
//         reconnectInterval: 500
//     });
// });
