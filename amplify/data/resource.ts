import { defineData } from '@aws-amplify/backend-data';
import { type ClientSchema, type Schema } from '@aws-amplify/backend-data';

type MessageSchema = {
  Message: {
    id: string;
    message: string;
    timestamp: number;
    createdAt: string;
    updatedAt: string;
  }
};

export const data = defineData({
  schema: './schema.graphql',
  authorizationModes: {
    defaultAuthorizationMode: 'API_KEY',
    apiKeyAuthorizationMode: {
      expiresInDays: 30
    }
  }
}) satisfies ClientSchema<Schema<MessageSchema>>;
