import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

const ddbClient = new DynamoDBClient({ region: process.env.REGION });
const TableName = process.env.TABLE_NAME;

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
    try {
        const { userId } = event.pathParameters || {};
        const body = event.body ? JSON.parse(event.body) : null;

        const {bio, userName, firstName, lastName, content, email, admin, image} = body;
        if (typeof content !== 'string') {
            return {
                statusCode: 400,
              headers: {
                "content-type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
                body: JSON.stringify({ error: 'Invalid request body format.' }),
            };
        }

      const updateParams = {
        TableName: TableName,
        Key: {
          userId: { S: userId }
        },
        UpdateExpression: 'SET userName = :userName, firstName = :firstName, lastName = :lastName, email = :email, bio = :bio, content = :content, admin = :admin, image = :image',
        ExpressionAttributeValues: {
          ':userName': { S: userName },
          ':firstName': { S: firstName },
          ':lastName': { S: lastName },
          ':email': email ? { S: email } : { NULL: true },
          ':bio': { S: bio },
          ':content': { S: content },
          ':admin': { BOOL: admin },
          ':image': image ? { S: image } : { NULL: true }
        },
        ReturnValues: 'ALL_NEW'
      };

      // @ts-ignore
        const updateCommand = new UpdateItemCommand(updateParams);
        const result = await ddbClient.send(updateCommand);

        return {
            statusCode: 200,
          headers: {
            "content-type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
            body: JSON.stringify({ message: 'userId updated successfully', data: result.Attributes }),
        };
    } catch (error: any) {
        console.error('Error:', error);
        return {
            statusCode: 500,
          headers: {
            "content-type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
