import { defineBackend } from '@aws-amplify/backend';
import { defineAuth } from '@aws-amplify/backend-auth';
import { defineFunction } from '@aws-amplify/backend-function';
import { defineData } from '@aws-amplify/backend-data';
import { type ClientSchema, type Schema } from '@aws-amplify/backend-data';

const auth = defineAuth({
  loginWith: {
    email: true,
    phone: false,
    username: false
  }
});

type MessageSchema = {
  Message: {
    id: string;
    message: string;
    timestamp: number;
    createdAt: string;
    updatedAt: string;
  }
};

const data = defineData({
  schema: 'amplify/data/schema.graphql',
  authorizationModes: {
    defaultAuthorizationMode: 'API_KEY',
    apiKeyAuthorizationMode: {
      expiresInDays: 30
    }
  }
}) satisfies ClientSchema<Schema<MessageSchema>>;

const messageFunction = defineFunction({
  name: 'messageFunction',
  entry: 'amplify/message-function/handler.ts'
});

export const backend = defineBackend({
  auth,
  data,
  messageFunction
});
