var express = require('express');
var app = express();
var cors = require('cors');
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var busboy = require('connect-busboy');
const AWS = require('aws-sdk');
const {Storage} = require('@google-cloud/storage');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use(busboy());

const publicKey = 'ASIA6B5ADDPNBHAGW54F'; // Update the keys
const secretKey = 'AT8s54ZOvMLgKG8B+fEifwzF3+Z6ngqZ86glGv2E';
const sessionToken = 'FQoGZXIvYXdzEI///////////wEaDPYtEEk9QjVh1mMbQSKWAopqMj8ZxB2SVXBovfx7fEzKi0ZMjf3nBhj4kIP3sigRBUacic2HuRR07yjoUG5XoHsg1DOKK5R0eICRIH5QaFLw85CuAB8BEXjjMPIM8AmsaZWn0whxu+09i/kodUrr25id4cQYjpjvQZrI+1jjPQDpVs29asrQU/zqFYBNXHLVIQCe1QOb+caop+wc83CvQrmqj5PG7V2e0EyGzkeUBaNl+0HCPR9ycdWt2wxS3FQBI+1Jt/v1NQpXPfcrePSZ1fV6k0TN+j1TCOwXeFmFW0T4AWyIy3tTwT0blO9WQddCzTLflT3kc5o0Ks6Ma4tCOEQ1Zmud/dBCwdObd0elLccoMGhKlPKssvjwbIqp+SfTugHyAOfiKO/Uoe0F';

const GOOGLE_CLOUD_PROJECT_ID = ''; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = ''; // Replace with the path to the downloaded private key


const s3 = new AWS.S3(
 {accessKeyId: publicKey, secretAccessKey: secretKey, sessionToken: sessionToken}
);
// const storage = new Storage({
//     projectId: GOOGLE_CLOUD_PROJECT_ID,
//     keyFilename: GOOGLE_CLOUD_KEYFILE,
//   });

app.post('/fileupload', function(req, res) {
    var fstream,responce=false;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        const params = {
          Bucket: 'cloudaws1999',
          Key: (filename),
          Body: file
        };
        // fstream = fs.createWriteStream(filename);
        // file.pipe(fstream);
        s3.upload(params, function(s3Err, data) {
          if (s3Err) {
              console.log("Error uploading data: ", s3Err);
            } else {
              console.log("Successfully uploaded data");
            }
        });
        // storage.bucket('yogesh5466').upload(filename,function(s3Err, data) {
        //   if (s3Err) {
        //       console.log("Error uploading data: ", s3Err);
        //     } else {
        //       console.log("Successfully uploaded data");
        //     }
        //   });
        responce=true;
    });
    req.busboy.on('finish', function () {
        res.send(responce);
    });
});

app.listen(3001, () => {
  console.log('Server started');
});
