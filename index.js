const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/urlshortner.route');
var dynogels = require('dynogels');
const AWS = dynogels.AWS;
const config = {
    region: process.env.region,
    endpoint: process.env.dynogels_endpoint,
    accessKeyId: process.env.dynogels_accessKey,
    secretAccessKey: process.env.dynogels_accessSecret
};
AWS.config.update(config);
const dynamodb = new AWS.DynamoDB();

dynogels.dynamoDriver(
    new AWS.DynamoDB({
        region: process.env.region,
        endpoint: process.env.dynogels_endpoint,
        accessKeyId: process.env.dynogels_accessKey,
        secretAccessKey: process.env.dynogels_accessSecret
    })
);
// var cors = require('cors');
// var corsOptions={
//     origin: 'http://localhost:4200',
//     optionsSuccessStatus:200
// }
// console.log(' localhostcorsmode checking ');
// if ((process.env.LOCALHOST_CORS_ALLOWED) && (process.env.LOCALHOST_CORS_ALLOWED === 'Y')) {
// console.log(' localhostcorsmode is on');
// app.options('*', cors(corsOptions));
// app.use(cors(corsOptions));
// } 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',router);

const port = process.env.PORT||'8080';
app.set('port',port);

app.listen(port,()=>console.log(`Shortener is running on port : ${port}`));