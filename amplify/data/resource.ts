import { defineData } from '@aws-amplify/backend';
import { type ClientSchema } from '@aws-amplify/data-schema';

const schema = {
  Message: {
    primaryKey: { id: 'string' },
    sortKey: { timestamp: 'number' },
    values: {
      message: 'string'
    }
  }
} satisfies ClientSchema;

export const data = defineData({
  schema,
  name: 'messages'
});
