// import Amplify, { Auth, API } from 'aws-amplify';
import {
  createClient
  // config
} from '../../src/common/apollo';

let client;

async function initClient() {
  if (!client) {
    client = createClient({
      disableOffline: true
    });
  }
  return client;
}

// Amplify.configure(awsconfig);
// -- This is a parent command --
Cypress.Commands.add('login', async () => {
  // await Auth.signIn('nino+employee@moretonblue.com', 'blahblah');
});

Cypress.Commands.add('getClient', async () => {
  const client = await initClient();
  return client;
});
