import {APIGatewayProxyHandlerV2} from "aws-lambda";
import {DynamoDBDocumentClient, PutCommand} from "@aws-sdk/lib-dynamodb";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

const ddbDocClient = createDDbDocClient();


export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    console.log("Received event:", event);  // Log the raw event data
    const body = event.body ? JSON.parse(event.body) : undefined;

    if (!body || !body.userId || !body.bookingId) {
      return {
        statusCode: 400,
        headers: {
          "content-type": "application/json",
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ message: "Missing required fields (userId or bookingId)" }),
      };
    }

    const item = {
      userId: body.userId,
      bookingId: body.bookingId,
      ...body // Spread the rest of the body if there are additional fields
    };

    const commandOutput = await ddbDocClient.send(
      new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: item,
      })
    );
    console.log("PutCommand Output:", commandOutput);

    return {
      statusCode: 201,
      headers: {
        "content-type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: "Booking successfully added" }),
    };
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return {
      statusCode: 500,
      headers: {
        "content-type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ error: "Internal Server Error", message: error.message }),
    };
  }

};
  function createDDbDocClient() {
    const ddbClient = new DynamoDBClient({ region: process.env.REGION });
    const marshallOptions = {
      convertEmptyValues: true,
      removeUndefinedValues: true,
      convertClassInstanceToMap: true,
    };
    const unmarshallOptions = {
      wrapNumbers: false,
    };
    const translateConfig = { marshallOptions, unmarshallOptions };
    return DynamoDBDocumentClient.from(ddbClient, translateConfig);
  }

