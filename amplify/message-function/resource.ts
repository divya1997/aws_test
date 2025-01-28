import { defineFunction } from '@aws-amplify/backend-function';
import { type FunctionResources } from '@aws-amplify/backend-function';

export const messageFunction = defineFunction({
  name: 'messageFunction',
  entry: './handler.ts',
  permissions: {
    resources: [
      {
        type: 'dynamodb',
        actions: ['dynamodb:PutItem', 'dynamodb:GetItem', 'dynamodb:Query', 'dynamodb:Scan'],
        resources: ['messages']
      }
    ]
  },
  environment: {
    variables: {
      TABLE_NAME: 'messages'
    }
  }
} as FunctionResources);
