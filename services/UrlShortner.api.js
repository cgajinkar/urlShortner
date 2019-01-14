const { ERROR, OK } = require('../lib/http-responses');
const post = (service, data, callback) => {
    service.encode(data).subscribe(
        data => callback(OK(data)),
        err => callback(ERROR(err))
    );
};

const getdecode = (service, data, callback) => {
    service.decode(data).subscribe(
        data => callback(OK(data)),
        err => callback(ERROR(err))
    );
};

const redirect =(service, data, callback)=>{
    service.decode(data).subscribe(
        data => {
            console.log(data.url);
            callback(null,data.url);
        },
        err => callback(ERROR(err),null)
    );
}


module.exports = { post, getdecode, redirect }