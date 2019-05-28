import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { SnackbarProvider } from "notistack";
import { ModelFormControllerProvider } from "./modules/ModelFormController";
import TextField from "@material-ui/core/TextField";
import { createApolloClient } from "./client";
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

function GraphqlEndpoint(props) {
  const { onChange, defaultValue = "https://endpoint" } = props;
  return (
    <TextField
      label="Graphql Endpoint"
      defaultValue={defaultValue}
      margin="normal"
      onChange={onChange}
    />
  );
}

function TokenInput(props) {
  const { onChange, defaultValue = "token here" } = props;
  return (
    <TextField
      defaultValue={defaultValue}
      label="Token"
      margin="normal"
      onChange={onChange}
    />
  );
}
function SchemaInput(props) {
  const { defaultValue, onChange } = props;
  return (
    <TextField
      id="standard-multiline-static"
      label="Schema JSON"
      multiline
      rows="5"
      defaultValue={defaultValue}
      onChange={onChange}
      margin="normal"
    />
  );
}

export default function App(props) {
  const [state, setState] = React.useState({
    ep: localStorage.getItem("amr-ep") || "https://ep",
    token: localStorage.getItem("amr-token") || "token here",
    schema: null
  });
  const { schema, client, ep, token } = state;
  React.useEffect(() => {
    let um = false;
    if (!ep || !token) return;
    const client = createApolloClient(state.ep, state.token);
    client
      .query({
        query: introSpecQuery,
        fetchPolicy: "network-only"
      })
      .then(data => {
        setState(set("client", client));
        setState(oldState => ({
          ...oldState,
          client,
          schema: data
        }));
      });
    return () => (um = true);
  }, [state.ep, state.token]);
  console.log(">>src/App::", "schema", schema); //TRACE
  return (
    <>
      <GraphqlEndpoint
        defaultValue={ep}
        onChange={e => {
          const { value } = e.target;
          console.log(">>src/App::", "value", value); //TRACE
          localStorage.setItem("amr-ep", value);
          setState(set("ep", value));
        }}
      />
      <span style={{ marginLeft: 20 }} />
      <TokenInput
        defaultValue={token}
        onChange={e => {
          const { value } = e.target;
          console.log(">>src/App::", "value", value); //TRACE
          localStorage.setItem("amr-token", value);
          setState(set("token", value));
        }}
      />
      {client && schema && (
        <>
          <Divider />
          <ModelFormControllerProvider schema={schema}>
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
      )}
    </>
  );
}
