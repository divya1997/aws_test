import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';

const ddbClient = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(ddbClient);

export const handler = async (event: any) => {
  try {
    switch (event.httpMethod) {
      case 'GET':
        return await getMessages();
      case 'POST':
        return await saveMessage(JSON.parse(event.body));
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Unsupported method' })
        };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};

async function getMessages() {
  const params = {
    TableName: process.env.TABLE_NAME,
    Limit: 100,
  };

  const result = await ddb.send(new ScanCommand(params));
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(result.Items)
  };
}

async function saveMessage(data: { message: string }) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: uuidv4(),
      message: data.message,
      timestamp: Date.now()
    }
  };

  await ddb.send(new PutCommand(params));
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ message: 'Message saved successfully' })
  };
}
