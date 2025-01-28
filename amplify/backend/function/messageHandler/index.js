const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

const TABLE_NAME = 'messages';

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
        TableName: TABLE_NAME,
        Limit: 100,
        ScanIndexForward: false
    };

    const result = await dynamodb.scan(params).promise();
    
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(result.Items)
    };
}

async function saveMessage(data) {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            id: uuidv4(),
            message: data.message,
            timestamp: Date.now()
        }
    };

    await dynamodb.put(params).promise();
    
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'Message saved successfully' })
    };
}
