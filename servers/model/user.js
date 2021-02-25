const Mongoose = require('mongoose');
const config = require('../config/config');

const mongo_schema = Mongoose.Schema({
    userid: String,
    pw: String,
    email: String
},
{
    versionKey:false
});

let user = Mongoose.model(config.mongo_collection_name, mongo_schema);

module.exports = {user};