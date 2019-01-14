const {getdecode,post}=require('../services/UrlShortner.api');
var dynogels = require('dynogels');
const { ShortURL } = require('../models/urlshortner');
const { UrlShortner } = require('../services/UrlShortner.service');
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

const createTables = () => {
    dynogels.createTables(createError => {
        if (createError) {
            console.log('Error Creating Tables: ', createError);
        } else {
            console.log('Table has been created');
        }
    });
}

createTables();