"use strict";

// lambdas/accomadation/imageUpload.ts
var AWS = require("aws-sdk");
var s3 = new AWS.S3();
exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    if (!body || !body.image || !body.mime) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Incorrect request body" })
      };
    }
    const { image, mime } = body;
    const buffer = Buffer.from(image, "base64");
    const key = `images/${Date.now()}-${Math.random()}.png`;
    const params = {
      Bucket: "imagesBucket",
      Key: key,
      Body: buffer,
      ContentType: mime,
      ACL: "public-read"
      // Optional: Set the ACL to make the object publicly accessible
    };
    await s3.upload(params).promise();
    const imageURL = `https://s3.console.aws.amazon.com/s3/buckets/restapistack-imagesbucketf1a776cf-rf7scykpp1we?region=eu-west-1/${key}`;
    return {
      statusCode: 200,
      body: JSON.stringify({ imageURL })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to upload image", error: error.message })
    };
  }
};
