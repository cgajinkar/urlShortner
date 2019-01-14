var dynogels = require('dynogels');
var Joi = require('joi');

const HASHKEYURL = 'url';
const DataSchema = {
    url: Joi.string(),
    value: Joi.string(),
    browsingurl: Joi.string(),
    decodeurl: Joi.string()
}
const ShortURL = dynogels.define('ShortURL', {
    hashKey: HASHKEYURL,
    timestamps: true,
    indexes : [{
        hashKey : 'value', name : 'value-index', type : 'global'
      }],
    schema: DataSchema,
    tableName: 'SHORTURL'
});

module.exports={ShortURL};