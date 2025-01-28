import { defineFunction } from "@aws-amplify/backend";
import { Schema } from "@aws-amplify/backend-schema";

export const messageFunction = defineFunction({
  name: "message-function",
  entry: "./handler.ts",
  environment: {
    TABLE_NAME: "messages"
  }
});
