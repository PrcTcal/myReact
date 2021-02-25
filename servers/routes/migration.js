const config = require('../config/config');
const AWS = require('aws-sdk');
const fs = require('fs');

const exportData = (table, bar, socket) => {
    return new Promise(async (resolve, reject) => {
        
        AWS.config.update(config.aws_remote_config);
        let start = new Date();
        let params = {}, music;
        let docClient = new AWS.DynamoDB.DocumentClient();
        let rs = [];

        // using scan
        params = {
            TableName: table,
            //ProjectionExpression: "id, Artist, songTitle, info, idx, actv"
        };
        
        let checking = (doc, par) => {
            return new Promise((resolve, reject) => {
                doc.scan(par, (err, data) => {
                    if(err){
                        return reject(err);
                    } else {
                        return resolve(data);
                    }
                });
            });
        }
        let startKey = {}, fileNum = 0;
        while(startKey != null){
            await checking(docClient, params).then(function(data){
                if(data.Count == 0) return reject(new Error("There is No Data or Table"));
                if(data.LastEvaluatedKey != null) {
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                    startKey = data.LastEvaluatedKey;
                } else {
                    startKey = null;
                }
                for(let item of data.Items){
                    // partition key, LSI 제거
                    delete item.dummy;
                    delete item.srchArtist;
                    delete item.srchsongTitle;
                    delete item.srchidx;
                    rs.push(item);
                    if(rs.length % 10000 == 0) { 
                        bar.tick();
                        socket.emit('tick', bar.curr);
                    }
                    if(rs.length == 100000){
                        //console.log(fileNum + " exported data size : " + rs.length);
                        if(rs.length == 0) return reject(new Error('There is No Data or Table'));
                        fs.writeFileSync(`./export${fileNum++}.json`, JSON.stringify(rs), 'utf8');
                        rs = [];
                        //console.log('writeFileSync completed');
                    }
                }
                //console.log(rs.length);
            });
        } 
        
        return resolve((new Date() - start));    
    });
}

module.exports = exportData;