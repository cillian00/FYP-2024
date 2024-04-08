"use strict";

// lambdas/accomadation/imageUpload.ts
var AWS = require("aws-sdk");
var s3 = new AWS.S3();
exports.handler = async (event) => {
  try {
    const imageBase64 = event.body;
    const imageBuffer = Buffer.from(imageBase64, "base64");
    const bucketName = "your-s3-bucket-name";
    const key = event.filename;
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: imageBuffer
    };
    await s3.upload(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Image uploaded successfully" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error uploading image: " + error.message })
    };
  }
};
