const express = require('express');
const uploadImages = express();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { bucketName, accessKey, secretAccess } = require('../../config');

const s3 = new aws.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretAccess,
  bucket: bucketName
});
let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
    contentType: function (req, file, cb) {
      cb(null, 'multipart/form-data');
    }
  })
});

uploadImages.post('/images', upload.array('image'), async (req, res) => {
  for (let i = 0; i < req.files.length; i++) {
    console.log(
      'File: "' + req.files[i].originalname + '" is uploaded successfully!'
    );
  }
  res.send({
    msg: 'Successfully uploaded ' + req.files.length + ' files!'
  });
});

module.exports = uploadImages;
