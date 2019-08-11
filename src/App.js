import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { SnackbarProvider } from "notistack";
import { ModelFormControllerProvider } from "./modules/ModelFormController";
import TextField from "@material-ui/core/TextField";
import { client } from "./common/apollo";
import Divider from "@material-ui/core/Divider";
import ModelFormPlayground from "./ModelFormPlayground";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Storage } from "aws-amplify";
import DummyStorageProvider from "./DummyStorageProvider";
import set from "lodash/fp/set";
import get from "lodash/get";
import { introSpecQuery } from "./introspec";

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
    client
      .query({
        query: introSpecQuery, 
        fetchPolicy:'network-only'
      })
      .then(data => {
        console.log(">>src/App::", "data", data); //TRACE
        setState(oldState => ({ ...oldState, schema: data }));
      });
  }, []);

  if (!state.schema) return <center>Fetching schema..</center>;
  console.log(">>src/App::", "state.schema", state.schema); //TRACE
  return (
    <>
      <Divider />
      <ModelFormControllerProvider schema={state.schema}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
              <SnackbarProvider
                maxSnack={1}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <ModelFormPlayground />
              </SnackbarProvider>
            </ApolloHooksProvider>
          </ApolloProvider>
        </MuiPickersUtilsProvider>
      </ModelFormControllerProvider>
    </>
  );
}
