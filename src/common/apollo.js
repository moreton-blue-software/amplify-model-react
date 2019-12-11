import config from '../aws-exports';
import Amplify from 'aws-amplify';
import { ApolloClient } from 'apollo-client';
import { createAppSyncLink, AUTH_TYPE } from 'aws-appsync';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { setContext } from 'apollo-link-context';

Amplify.configure(config);

const cache = new InMemoryCache();
export { config };

// https://www.apollographql.com/docs/react/networking/authentication/#header
// const authLink = setContext((_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//       ['x-api-key']: config.aws_appsync_apiKey
//     }
//   };
// });

const awsLink = createAppSyncLink({
  url: config.aws_appsync_graphqlEndpoint,
  region: config.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: config.aws_appsync_apiKey
  }
});

export function createClient() {
  const client = new ApolloClient({ link: awsLink, cache });
  return client;
}

export const client = createClient();
