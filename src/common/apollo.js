import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import config from '../aws-exports';
import Amplify from 'aws-amplify';
import { InMemoryCache } from 'apollo-cache-inmemory';

Amplify.configure(config);

const cache = new InMemoryCache();
export { config };

export function createClient(opts = {}) {
  return new AWSAppSyncClient(
    {
      url: config.aws_appsync_graphqlEndpoint,
      region: config.aws_appsync_region,
      auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: config.aws_appsync_apiKey
      },
      ...opts
    },
    {
      cache,
      defaultOptions: {}
    }
  );
}

export const client = createClient();
