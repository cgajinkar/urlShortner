# urlShortner
nodejs sample app for Url Shortner

step 1: Download Dynamodb
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html
step 2: Extract and start Dynamodb
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -port 8383
step 3: Configure aws-cli with accesskey and secret key.
step 4: Set env.bat/sh variable
step 5: install npm modules
step 6: create db tables==> node seeder\dbseeder.js
step 5: to start server==>node index.js
POST Url==>http://localhost:8787/
POST Body==>
{
	"url": "https://www.google.com/maps/place/Galgibaga+Beach/@14.96950978,74.0451005,463m/data=!3m1!1e3!4m5!3m4!1s0x3bbe5b3c39a8699f:0x9ec1bd1c29b6b529!8m2!3d14.9600472!4d74.0495654"
}

Response:
{
    "data": {
        "browsingurl": "http://localhost:8787/path/-1776881227",
        "createdAt": "2019-01-12T14:52:12.646Z",
        "decodeurl": "http://localhost:8787/-1776881227",
        "value": "-1776881227",
        "url": "https://www.google.com/maps/place/Galgibaga+Beach/@14.96950978,74.0451005,463m/data=!3m1!1e3!4m5!3m4!1s0x3bbe5b3c39a8699f:0x9ec1bd1c29b6b529!8m2!3d14.9600472!4d74.0495654"
    },
    "code": 200,
    "status": "success"
}


