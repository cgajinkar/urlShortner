const  { Observable } =  require('rxjs');
class UrlShortner {

    constructor(model) {
        this.model = model;
    }

    encode(urldata) {
        return Observable.create(observer => {
            this.exist(urldata.url).then(d => {
                if (d !== null) {
                    observer.next(d.attrs);
                    observer.complete();
                }else{
                    let value = hashCode(urldata.url).toString();
                    urldata.value = value;
                    urldata.browsingurl=`${urldata.decodeurl}/path/${value}`;
                    urldata.decodeurl=`${urldata.decodeurl}/${value}`;
                    this.model.create(urldata, function (error, data) {
                        if (error) {
                            observer.error(error);
                            observer.complete();
                        } else {
                            observer.next(data.attrs);
                            observer.complete();
                        }
                    });
                }
            }).catch(err => {
                observer.error(err);
                observer.complete();
            });
        });
    }

    exist(urlcode) {
        return new Promise((resolve, reject) => {
            this.model.get(urlcode, (error, data) => {
                if (error)
                    reject(error);
                else {
                    resolve(data);
                }
            });
        });
    }

    decode(value) {
        return Observable.create(observer => {
            this.model
                .query(value)
                .usingIndex("value-index")
                .loadAll()
                .exec((error, data) => {
                    if (error) {
                        return error;
                    } else {
                        if (data.Count < 1) {
                            observer.next({ 'Message': 'Tiny Url dont exist', urlcode: value })
                            observer.complete();
                        } else {
                            observer.next(data.Items[0].attrs);
                            observer.complete();
                        }
                    }
                });
        });
    }
}

const hashCode = (s) => {
    let h;
    for (let i = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;

    return h;
}

module.exports = { UrlShortner };