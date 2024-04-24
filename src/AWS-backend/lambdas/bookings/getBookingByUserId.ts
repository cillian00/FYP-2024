import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const ddbClient = new DynamoDBClient({ region: process.env.REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const userId = event.queryStringParameters?.userId; // Assuming userId is passed as a query string parameter
  if (!userId) {
    return {
      statusCode: 400,
      headers: {
        "content-type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: "userId parameter is required" })
    };
  }

  const queryCommand = new QueryCommand({
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId
    }

  });

  try {
    const data = await ddbDocClient.send(queryCommand);
    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(data.Items)
    };
  } catch (error) {
    console.error("Query failed:", error);
    return {
      statusCode: 500,
      headers: {
        "content-type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ error: "Internal Server Error", details: error.message })
    };
  }
};
