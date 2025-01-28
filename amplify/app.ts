import * as cdk from 'aws-cdk-lib';
import { MessagesStack } from './backend';

const app = new cdk.App();
new MessagesStack(app, 'MessagesStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1'
  }
});
