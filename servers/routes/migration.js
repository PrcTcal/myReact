const config = require('../config/config');
const AWS = require('aws-sdk');
const fs = require('fs');
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

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
                        fs.writeFileSync(`./tempData/export${fileNum++}.json`, JSON.stringify(rs), 'utf8');
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

const importData = (table, rs, m, bar, socket) => {
    return new Promise(async (resolve, reject) => {
        AWS.config.update(config.aws_remote_config);
        let start = new Date();
        let cur = 0, count = 0;
        let total = rs.length;
        let maxCount = total % 25 == 0 ? Math.floor(total / 25) : Math.floor(total / 25) + 1;
        let params = {}, music;
        if(total == 0) return reject(new Error("There is no Data or Table"));

        AWS.events.on('retry', function(resp) {
            //if(resp.retryCount > 5) console.log(resp.error.requestId + ' - current retry count : ' + resp.retryCount);
        });

        let dynamodb = new AWS.DynamoDB();
        let semaphore = 0, dummyVal = 0;
        let later = [];
        const getMap = (obj) => {
            let result = {};
            for(let mkey in obj){
                if(typeof(obj[mkey]) == 'string'){
                    result[mkey] = { "S" : obj[mkey] };
                } else if(typeof(obj[mkey]) == 'number'){
                    result[mkey] = { "N" : String(obj[mkey]) };
                } else if(typeof(obj[mkey]) == 'boolean'){
                    result[mkey] = { "BOOL" : obj[mkey] };
                } else if(typeof(obj[mkey]) == 'object') {
                    result[mkey] = { "M" : getMap(obj[mkey]) };
                }
            }
            return result;
        }
        cur = 0; 
        count = 0;
        console.log(`inserting export${m}.json===================================`);
        while(total > 0){
            let req = {}, Item = {};
            req[table] = [];

            for(let i = 0 ; i < (total > 25 ? 25 : total) ; i++){
                
                Item = getMap(rs[cur]);
                // partition key와 LSI는 Item객체에 직접 할당을 해줘야한다(table schema).
                Item["dummy"] = { "N": String(dummyVal++) };
                Item["srchArtist"] = { "S": rs[cur].Artist };
                Item["srchsongTitle"] = { "S": rs[cur].songTitle };
                Item["srchidx"] = { "N": String(rs[cur].idx) };
                
                req[table].push({PutRequest : { "Item": Item }});
                cur++;
                if(dummyVal % 5000 == 0) dummyVal = 0;
            }

            total = total >= 25 ? total -= 25 : 0;
            params = {
                RequestItems: req
            };
            
            let processItemCallback = async function(perr, pdata){
                if(perr){
                    if(perr.code == 'ProvisionedThroughputExceededException') {
                        later.push({requestId: perr.requestId});
                        semaphore--;
                        count++;
                        if(count == maxCount) {
                            let end = new Date();
                            console.log(end - start);
                            return resolve(end - start);
                        }
                    } else {
                        return reject(perr);
                    }
                } else {
                    if(Object.keys(pdata.UnprocessedItems).length != 0){
                        await sleep(500);
                        dynamodb.batchWriteItem({RequestItems: pdata.UnprocessedItems}, processItemCallback);
                    } else {
                        semaphore--;
                        count++;
                        if(count % 40 == 0) {
                            bar.tick();
                            socket.emit('importTick', bar.curr);
                        }
                        if(count == maxCount) {
                            let end = new Date();
                            console.log(end - start);
                            return resolve(end - start);
                        }
                    }
                }
            };
            
            semaphore++;
            dynamodb.batchWriteItem(params, processItemCallback);
            while(semaphore >= 16){
                await sleep(200);
            }   
        }
    })
}

module.exports = {exportData, importData};