const { post, getdecode } = require('../../services/UrlShortner.api');
const { UrlShortner } = require('../../services/UrlShortner.service');
const { Observable } = require('rxjs');
describe("***********Unit Tests for UrlShortner API***********", () => {
    let service, model
    describe("***********Unit Tests for POST Method passed successfully***********", () => {
        let dummydata = {
            url: 'https://medium.com/@mpodlasin/promises-vs-observables-4c123c51fe13',
            value: 450212628,
            createdAt: '2019-01-10T11:54:13.614Z'
        }
        beforeEach(() => {
            service = new UrlShortner(model);
            spyOn(service, 'encode').and.returnValue(
                Observable.create(observer => {
                    observer.next(dummydata);
                    observer.complete();
                }));
        });
        it('should succeed and return encodeData', () => {
            let result = null;
            post(service, { url: 'https://medium.com/@mpodlasin/promises-vs-observables-4c123c51fe13' }, (data) => {
                result = data;
            });
            expect(result).toBeDefined();
            expect(service.encode).toHaveBeenCalled();
            expect(result.data).toBe(dummydata);
            expect(result.code).toBe(200);
            expect(result.status).toBe('success');
        });
    });
    describe("***********Unit Tests for POST Method failed successfully***********", () => {
        let errormsg = 'Error ocurred while encoding URL'
        beforeEach(() => {
            service = new UrlShortner(model);
            spyOn(service, 'encode').and.returnValue(
                Observable.create(observer => {
                    observer.error(errormsg);
                    observer.complete();
                }));
        });
        it('should succeed and return error', () => {
            let result = null;
            post(service, { url: 'https://medium.com/@mpodlasin/promises-vs-observables-4c123c51fe13' }, (data) => {
                result = data;
            });
            expect(result).toBeDefined();
            expect(service.encode).toHaveBeenCalled();
            expect(result.error).toBe(errormsg);
            expect(result.code).toBe(500);
            expect(result.status).toBe('error');
        });
    });

    describe("***********Unit Tests for getdecode Method passed successfully***********", () => {
        dummydata = {
            value: '-450212628',
            createdAt: '2019-01-12T09:19:02.554Z',
            url: 'https://docs.aws.amazon.com/amazondodb/ltest/developerguide/DynamoDBLocal.DownloadingndRunning.html'
        }
        beforeEach(() => {
            service = new UrlShortner(model);
            spyOn(service, 'decode').and.returnValue(
                Observable.create(observer => {
                    observer.next(dummydata);
                    observer.complete();
                }));
        });
        it('should succeed and return decoded URL', () => {
            let result = null;
            getdecode(service, '-450212628', (data) => {
                result = data;
            });
            expect(result).toBeDefined();
            expect(service.decode).toHaveBeenCalled();
            expect(result.data).toBe(dummydata);
            expect(result.code).toBe(200);
            expect(result.status).toBe('success');
        });
    });

    describe("***********Unit Tests for getdecode Method passed successfully***********", () => {
        dummydata = { 'Message': 'Tiny Url dont exist', urlcode: '-450212628' };
        beforeEach(() => {
            service = new UrlShortner(model);
            spyOn(service, 'decode').and.returnValue(
                Observable.create(observer => {
                    observer.next(dummydata);
                    observer.complete();
                }));
        });
        it('should succeed and return decoded URL', () => {
            let result = null;
            getdecode(service, '-450212628', (data) => {
                result = data;
            });
            expect(result).toBeDefined();
            expect(service.decode).toHaveBeenCalled();
            expect(result.data).toBe(dummydata);
            expect(result.code).toBe(200);
            expect(result.status).toBe('success');
        });
    });

    describe("***********Unit Tests for getdecode Method failed successfully***********", () => {
        let errorMsg = 'Error occured while decoding url pattern'
        beforeEach(() => {
            service = new UrlShortner(model);
            spyOn(service, 'decode').and.returnValue(
                Observable.create(observer => {
                    observer.error(errorMsg);
                    observer.complete();
                }));
        });
        it('should succeed and return decoded URL', () => {
            let result = null;
            getdecode(service, '-450212628', (data) => {
                result = data;
            });
            expect(result).toBeDefined();
            expect(service.decode).toHaveBeenCalled();
            expect(result.error).toBe(errorMsg);
            expect(result.code).toBe(500);
            expect(result.status).toBe('error');
        });
    });
});