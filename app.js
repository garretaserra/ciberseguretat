'use strict';
//Import libraries
let express = require('express');
let socketIO = require('socket.io');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');
let errorHandler = require('errorhandler');

//Import routes
let testRouter = require('./routes/test');
let generalRouter = require('./routes/general');
let calculatorRouter = require('./routes/calculator');

//Server variable initialization
const port = 3000;
let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(errorHandler());

app.use('', generalRouter);
app.use('/test', testRouter);
app.use('/calculator', calculatorRouter);

//Make app listen on port 3000
const server = app.listen(port);
console.log('Server listening on port 3000');
module.exports = app;

// Aggregator
let agg = express();
agg.use(cors());
agg.use(bodyParser.json());
agg.use(bodyParser.text());
agg.use(errorHandler());

agg.use('', require('./routes/aggregator'))

//Make app listen on port 3000
agg.listen(port+1);
module.exports = agg;

// Socket initialisation
let io = socketIO(server);
let socket = require('./sockets/socketScripts')
socket.socket(io);

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
