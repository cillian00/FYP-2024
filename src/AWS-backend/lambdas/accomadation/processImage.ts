import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  try {
    // Print Event
    console.log("Event: ", event);
    const body = event.body ? JSON.parse(event.body) : undefined;
    if (!body) {
      return {
        statusCode: 500,
        headers: {
          "content-type": "application/json",
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ message: "Missing request body" }),
      };
    }

    const AWS = require('aws-sdk');

    const s3 = new AWS.S3();

// Set the S3 bucket name and key

    const bucketName = 'restapistack-imagesbucketf1a776cf-rf7scykpp1we';

    const key = body.name; // e.g. 'images/myimage.jpg'

// Set the file content type

    const contentType = 'image/jpeg'; // or whatever content type your file is

    // Create the S3 upload parameters

    const params = {

      Bucket: bucketName,

      Key: key,

      Body: event, // the file data (buffer, stream, or string)

      ContentType: contentType

    };


    s3.upload(params, function(err, data) {

      if (err) {

        console.log('Error uploading file:', err);

      } else {

        console.log('File uploaded successfully:', data.Location);

      }

    });
  } catch (error: any) {
    console.log(JSON.stringify(error));
    return {
      statusCode: 500,
      headers: {
        "content-type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ error }),
    };
  }
};

