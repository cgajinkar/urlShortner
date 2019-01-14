const { UrlShortner } = require('../../services/UrlShortner.service');
describe("***********Unit Tests for UrlShortner Service***********", () => {
    let service, model;
    describe("***********Unit Tests for encode Method passed successfully***********", () => {
        let dummydata = {
            attrs: {
                url:
                    'https://docs.aws.amazco/amazondodb/ltest/developerguide/DynamoDBLocal.DownloadingndRunning.html',
                value: '-450212628',
                createdAt: '2019-01-12T10:00:15.137Z'
            }
        }
        beforeEach(() => {
            model = {
                create: jasmine.createSpy(function(d,callback){return callback(null,dummydata)}),
            };
            service = new UrlShortner(model);
            spyOn(service, 'exist')
                .and
                .returnValue(Promise.resolve(null));
        });
        it('should succeed and return encodeData', () => {
            service.encode({ url: 'https://docs.aws.amazco/amazondodb/ltest/developerguide/DynamoDBLocal.DownloadingndRunning.html' })
                .subscribe(data => {
                    console.log(data);
                    expect(service.exist).toHaveBeenCalled();
                    expect(model.create).toHaveBeenCalled();
                },error=>{console.log(error)});

        });
    });
});