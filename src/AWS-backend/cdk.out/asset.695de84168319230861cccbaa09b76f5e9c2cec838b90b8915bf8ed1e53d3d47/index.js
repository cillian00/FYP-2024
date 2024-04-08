"use strict";

// lambdas/accomadation/imageUpload.ts
var AWS = require("aws-sdk");
var s3 = new AWS.S3();
exports.handler = async (event) => {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Expires: 60
  };
  try {
    const url = await s3.getSignedUrlPromise("putObject", params);
    return {
      statusCode: 200,
      body: JSON.stringify({ uploadURL: url })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
