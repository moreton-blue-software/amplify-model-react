/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { SnackbarProvider } from 'notistack';
import { ModelFormControllerProvider } from './modules/ModelFormController';
import TextField from '@material-ui/core/TextField';
import { client } from './common/apollo';
import Divider from '@material-ui/core/Divider';
import ModelFormPlayground from './examples/model/ModelFormPlayground';
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
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'react-json-pretty/themes/monikai.css';
import JSONPretty from 'react-json-pretty';

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

export const TracerContext = React.createContext({});

function Tracer({ onLoad }) {
  const [traceLogs, setState] = React.useState({});
  const { setTraceListener } = React.useContext(TracerContext);
  console.log('>>src/App:dddd:'); //TRACE

  React.useEffect(() => {
    setTraceListener({
      setTrace(key, val) {
        setState(oldState => ({ ...oldState, [key]: val }));
      }
    });
    onLoad();
    console.log('>>src/App::', 'loadinged'); //TRACE
  }, [onLoad, setTraceListener]);
  return (
    <JSONPretty
      id="log-tracer"
      data={traceLogs}
      style={{ position: 'fixed', width: '30%' }}></JSONPretty>
  );
}

export default function App() {
  const [state, setState] = React.useState({ schema: null, tracerReady: false });
  const self = React.useRef({ traceListener: null });
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

  const tracerState = React.useMemo(
    () => ({
      setTrace(key, val) {
        const { traceListener } = self.current;
        if (!traceListener) return;
        traceListener.setTrace(key, val);
      },
      setTraceListener(traceListener) {
        self.current.traceListener = traceListener;
      }
    }),
    []
  );

  const handleTracerLoaded = React.useCallback(() => {
    setState(oldState => ({ ...oldState, tracerReady: true }));
  }, []);

  if (!state.schema) return <center>Fetching schema..</center>;
  return (
    <>
      <Divider />
      <ModelFormControllerProvider schema={state.schema}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ApolloProvider client={client}>
            <TracerContext.Provider value={tracerState}>
              <Router>
                <SnackbarProvider
                  maxSnack={1}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                  <div>
                    <div style={{ width: '70%', display: 'inline-block' }}>
                      {state.tracerReady && (
                        <Switch>
                          <Route path="/thread/:testType?">
                            <ThreadPlayground />
                          </Route>
                          <Route path="/model/:testType?">
                            <ModelFormPlayground />
                          </Route>
                          <Route exact path="/">
                            <Redirect to="/model/" />
                          </Route>
                        </Switch>
                      )}
                    </div>
                    <div
                      style={{
                        width: '30%',
                        display: 'inline-block',
                        verticalAlign: 'top'
                      }}>
                      <Tracer onLoad={handleTracerLoaded} />
                    </div>
                  </div>
                </SnackbarProvider>
              </Router>
            </TracerContext.Provider>
          </ApolloProvider>
        </MuiPickersUtilsProvider>
      </ModelFormControllerProvider>
    </>
  );
}
