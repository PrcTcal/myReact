const express = require('express');
const app = express();
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
const fs = require('fs');



app.use(bodyParser.json());
app.use('/login', loginRoute);

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
        migration.exportData('test01-music', bar, socket);
    });

    socket.on('import', async function(data){
        for(let i = 0 ; i < 10 ; i++){
            const bar = new ProgressBar(`importing export${i}.json - [:bar] [:percent] :etas`, {
                total:100,
                complete: '=',
                incomplete: ' ',
                width: 50
            });
            await migration.importData('test01-music2', JSON.parse(fs.readFileSync(`./tempData/export${i}.json`, {encoding: "utf8"})), i, bar, socket);
        }
    })
});

app.listen(port+1, () => {
    // MongoDB 연결
    Mongoose.connect(config.mongo_local_config, config.mongo_config)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(e => console.error(e));
    Mongoose.Promise = global.Promise;
    console.log('DB : MongoDB');
    console.log(`http server is running on ${port+1}`);
})

server.listen(port, () => {
    console.log(`http server is running on ${port}`);
});
