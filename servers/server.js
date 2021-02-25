const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.Port || 3001;
const route = require('./routes/index');
const Mongoose = require('mongoose');
const config = require('./config/config');

app.use(bodyParser.json());
app.use('/login', route);

app.listen(port, () => {
    // MongoDB 연결
    Mongoose.connect(config.mongo_local_config, config.mongo_config)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(e => console.error(e));
    Mongoose.Promise = global.Promise;
    console.log('DB : MongoDB');
    console.log(`express is running on ${port}`);
});