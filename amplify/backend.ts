import { defineBackend } from '@aws-amplify/backend';
import { defineAuth } from '@aws-amplify/backend/auth';
import { defineFunction } from '@aws-amplify/backend/function';
import { defineData } from '@aws-amplify/backend/data';

const auth = defineAuth({
  loginWith: {
    email: true,
    phone: false,
    username: false
  }
});

const data = defineData({
  schema: 'amplify/data/schema.graphql',
  authorizationModes: {
    defaultAuthorizationMode: 'API_KEY',
    apiKeyAuthorizationMode: {
      expiresInDays: 30
    }
  }
});

const messageFunction = defineFunction({
  name: 'messageFunction',
  entry: 'amplify/message-function/handler.ts',
  environment: {
    TABLE_NAME: 'messages'
  },
  permissions: {
    tables: ['messages']
  }
});

export const backend = defineBackend({
  auth,
  data,
  messageFunction
});
