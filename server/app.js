const express = require('express');
const fs = require('fs');
const csv=require("csvtojson/v2");
const app = express();
// const jsonArray=await csv().fromFile(log.csv);

app.use((req, res, next) => {
    // write your logging code here
    var agent = req.headers['user-agent'].replace(',', '') + ',';
    var time = new Date().toISOString() + ',';
    var method = req.method + ',';
    var resource = req.url + ',';
    var version = 'HTTP/' + req.httpVersion + ',';
    var status = res.statusCode + '/n';
    var saved = (agent + time + method + resource + version + status);

    fs.appendFile('log.csv', saved, (err) => {
        if (err) throw err;
        console.log(saved);

        next();
    });
});

app.get('/', (req, res) => {
// write your code to respond "ok" here
    res.status(200);
    res.send('ok');
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
csv()
    .fromFile('./log.csv')
    .then((obj)=>{
    console.log(obj);
    res.json(obj);
})
    });

module.exports = app;
