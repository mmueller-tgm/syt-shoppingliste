/**
 * Created by kevin_000 on 25.11.2017.
 * Edited by mmueller on 16.04.2018
 */
var process = require('process');
process.title = 'DS-Server'

/*
//Uncomment this block and comment out Line 25 if you want to use https

var fs = require( 'fs' );
var app = require('express')();
var https        = require('https');
var server = https.createServer({
    key: fs.readFileSync('path/to/privkey.pem'),
    cert: fs.readFileSync('path/to/cert.pem'),
    ca: fs.readFileSync('path/to/chain.pem'),
    requestCert: false,
    rejectUnauthorized: false
},app);
server.listen(3001);
let io = require('socket.io').listen(server)
*/

// setting up socket.io
let io = require('socket.io')(3001)

// setting up diffsync's DataAdapter
let diffsync = require('diffsync')
let dataAdapter = new diffsync.InMemoryDataAdapter()

// setting up the diffsync server
let diffSyncServer = new diffsync.Server(dataAdapter, io)
