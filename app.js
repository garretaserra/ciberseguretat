'use strict';
//Import libraries
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');
let errorHandler = require('errorhandler');
let myRsa = require('my_rsa');

//Import routes
let testRouter = require('./routes/test');
let generalRouter = require('./routes/general');

//Server variable initialization
let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(errorHandler());

app.use('', generalRouter);
app.use('/test', testRouter);

//Make app listen on port 3000
app.listen(3000);
console.log('Server listening on port 3000');
module.exports = app;

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
