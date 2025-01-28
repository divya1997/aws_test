const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');

const ddbClient = new DynamoDB({});
const ddb = DynamoDBDocument.from(ddbClient);

exports.handler = async (event) => {
  try {
    switch (event.httpMethod) {
      case 'GET':
        return await getMessages();
      case 'POST':
        return await saveMessage(JSON.parse(event.body));
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Unsupported method' }),
        };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};

async function getMessages() {
  const params = {
    TableName: process.env.TABLE_NAME,
    Limit: 100,
    ScanIndexForward: false,
  };

  const result = await ddb.scan(params);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(result.Items),
  };
}

async function saveMessage(data) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: uuidv4(),
      message: data.message,
      timestamp: Date.now(),
    },
  };

  await ddb.put(params);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ message: 'Message saved successfully' }),
  };
}
