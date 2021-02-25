const express = require('express');
//const app = express();
const cors = require('cors');
const server = require('http').createServer(express);
const io = require('socket.io')(server,  {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }});
const bodyParser = require('body-parser');
const port = process.env.Port || 3001;
const loginRoute = require('./routes/index');
const migration = require('./routes/migration');
const Mongoose = require('mongoose');
const config = require('./config/config');
const ProgressBar = require('progress');


/*
app.use(bodyParser.json());
app.use('/login', loginRoute);
app.use('/migration', migrationRoute);
*/
io.on('connection', (socket) => {
    console.log('connection success');
    socket.on('box', function(data){
        console.log(data);
    });

    socket.on('export', function(data){
        const bar = new ProgressBar('Exporting - [:bar] [:percent] :etas', {
            total:100,
            complete: '=',
            incomplete: ' ',
            width: 50
        });
        migration('test01-music', bar, socket);
        
    })
});

server.listen(port, () => {
    // MongoDB 연결
    Mongoose.connect(config.mongo_local_config, config.mongo_config)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(e => console.error(e));
    Mongoose.Promise = global.Promise;
    console.log('DB : MongoDB');
    console.log(`express is running on ${port}`);
});
