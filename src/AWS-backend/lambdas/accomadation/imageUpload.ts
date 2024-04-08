import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import * as AWS from 'aws-sdk';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log("Received headers:", event.headers);
  console.log("Is base64 encoded:", event.isBase64Encoded);

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing or invalid request body" }),
    };
  }

  try {
    const s3 = new AWS.S3();
    const bucketName = 'restapistack-imagesbucketf1a776cf-rf7scykpp1we';
    const key = `image_${Date.now()}.jpg`; // Example: image_1659045600000.jpg

    // Decode base64 string to binary if it is base64 encoded
    const bodyBuffer = event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body;

    const params = {
      Bucket: bucketName,
      Key: key,
      Body: bodyBuffer,
      ContentType: 'image/jpeg',
      // Note: ContentEncoding is not needed here, because we're now handling a binary buffer
    };

    // Upload to S3
    const data = await s3.upload(params).promise();
    console.log('File uploaded successfully:', data.Location);

    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: "File uploaded successfully", location: data.Location }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", error: error.toString() }),
    };
  }
};
