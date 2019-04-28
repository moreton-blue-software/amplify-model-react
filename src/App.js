import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { SnackbarProvider } from "notistack";
import { ModelFormControllerProvider } from "./modules/ModelFormController";
import TextField from "@material-ui/core/TextField";
import { Map } from "immutable";
import { createApolloClient } from "./client";
import Divider from "@material-ui/core/Divider";
import ModelFormPlayground from "./ModelFormPlayground";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Storage } from "aws-amplify";
import DummyStorageProvider from "./DummyStorageProvider";

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
  const [stateMap, setState] = React.useState(
    Map({
      ep: localStorage.getItem("amr-ep") || "https://ep",
      token: localStorage.getItem("amr-token") || "token here",
      schema: JSON.parse(localStorage.getItem("amr-schema"))
    })
  );
  const state = React.useMemo(() => stateMap.toJS(), [stateMap]);
  const { schema, client, ep, token } = state;
  React.useEffect(() => {
    if (!ep || !token) return;
    const client = createApolloClient(state.ep, state.token);
    setState(oldState => oldState.merge({ client }));
  }, [state.ep, state.token]);

  return (
    <>
      <GraphqlEndpoint
        defaultValue={ep}
        onChange={e => {
          const { value } = e.target;
          console.log(">>src/App::", "value", value); //TRACE
          localStorage.setItem("amr-ep", value);
          setState(oldState => oldState.merge({ ep: value }));
        }}
      />
      <TokenInput
        defaultValue={token}
        onChange={e => {
          const { value } = e.target;
          console.log(">>src/App::", "value", value); //TRACE
          localStorage.setItem("amr-token", value);
          setState(oldState => oldState.merge({ token: value }));
        }}
      />
      <div>
        <SchemaInput
          defaultValue={JSON.stringify(schema)}
          onChange={e => {
            const { value } = e.target;
            console.log(">>src/App::", "value", value); //TRACE
            localStorage.setItem("amr-schema", value);
            setState(oldState => oldState.merge({ schema: JSON.parse(value) }));
          }}
        />
      </div>
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
