var express = require('express');
const url = require('url');
const { ShortURL } = require('../models/urlshortner');
const { getdecode, post, redirect } = require('../services/UrlShortner.api');
const { UrlShortner } = require('../services/UrlShortner.service');
var router = express.Router();
router.post('/', function (req, res) {
    let urlservice= new UrlShortner(ShortURL);
    let body=req.body;
    body.decodeurl=`${req.protocol}://${req.get('host')}`;
    post(urlservice, body, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });
});


router.get('/:id', function (req, res) {
    let id = req.params.id;
    let urlservice= new UrlShortner(ShortURL);
    getdecode(urlservice, id.toString(), (data) => {
            res.send(data);
        }
    );
});

router.get('/path/:id',function(req,res){
    let id = req.params.id;
    let urlservice= new UrlShortner(ShortURL);
    redirect(urlservice, id.toString(), (error,data) => {
        if(error){
            res.send(error)
        }else{
            res.redirect(data);
        }
        }
    );
});
module.exports = router;