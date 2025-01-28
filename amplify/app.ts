import * as cdk from 'aws-cdk-lib';
import { MessagesStack } from './backend';

const app = new cdk.App();

// Get the environment from Amplify
const amplifyAppId = process.env.AWS_APP_ID;
const envName = process.env.USER_BRANCH || 'dev';

new MessagesStack(app, `MessagesStack-${amplifyAppId}-${envName}`, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1'
  },
  description: `Message board stack for Amplify app ${amplifyAppId} environment ${envName}`
});

app.synth();
