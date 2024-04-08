"use strict";

// lambdas/accomadation/imageUpload.ts
var AWS = require("aws-sdk");
var s3 = new AWS.S3();
exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const fileData = Buffer.from(body.file, "base64");
    const params = {
      Bucket: "imagesBucket",
      Key: "uploads/" + body.filename,
      // Specify the desired S3 object key
      Body: fileData
    };
    await s3.upload(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "File uploaded successfully" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error uploading file: " + error.message })
    };
  }
};
