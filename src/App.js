/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { SnackbarProvider } from 'notistack';
import { ModelFormControllerProvider } from './modules/ModelFormController';
import TextField from '@material-ui/core/TextField';
import { client } from './common/apollo';
import Divider from '@material-ui/core/Divider';
import ModelFormPlayground from './ModelFormPlayground';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Storage from '@aws-amplify/storage';
import DummyStorageProvider from './DummyStorageProvider';
import set from 'lodash/fp/set';
import get from 'lodash/get';
import { introSpecQuery } from './introspec';
import ThreadPlayground from './ThreadPlayground';
import { graphqlOperation, API } from 'aws-amplify';
import { onCreateVacancy } from './graphql/subscriptions';

function registerFakeStorageProvider() {
  // add the plugin
  Storage.addPluggable(new DummyStorageProvider());

  // get the plugin
  // Storage.getPluggable(DummyStorageProvider.providerName);

  // remove the plulgin
  // Storage.removePluggable(DummyStorageProvider.providerName);

  // send configuration into Amplify
  // Storage.configure({
  //   [DummyStorageProvider.providerName]: {
  //     // My Storage provider configuration
  //   }
  // });
}
registerFakeStorageProvider();

export default function App(props) {
  const [state, setState] = React.useState({ schema: null });
  React.useEffect(() => {
    const createPprSub = API.graphql(graphqlOperation(onCreateVacancy)).subscribe({
      next: data => {
        console.log('>>src/App::sss', 'data', data); //TRACE
      }
    });
    return () => {
      createPprSub.unsubscribe();
    };
  }, []);
  React.useEffect(() => {
    client
      .query({
        query: introSpecQuery,
        fetchPolicy: 'network-only'
      })
      .then(data => {
        console.log('>>src/App::', 'data', data); //TRACE
        setState(oldState => ({ ...oldState, schema: data }));
      });
  }, []);

  if (!state.schema) return <center>Fetching schema..</center>;
  console.log('>>src/App::', 'state.schema', state.schema); //TRACE
  const pathName = window.location.pathname;
  return (
    <>
      <Divider />
      <ModelFormControllerProvider schema={state.schema}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ApolloProvider client={client}>
            <SnackbarProvider
              maxSnack={1}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              {pathName.includes('/thread') ? (
                <ThreadPlayground />
              ) : (
                <ModelFormPlayground />
              )}
            </SnackbarProvider>
          </ApolloProvider>
        </MuiPickersUtilsProvider>
      </ModelFormControllerProvider>
    </>
  );
}
