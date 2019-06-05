import React from "react";
import Select from "../Select";
import { useQuery, useApolloClient } from "react-apollo-hooks";
import get from "lodash/get";
import gql from "graphql-tag";
import Promise from "bluebird";
import upperCase from "lodash/upperCase";
import startCase from "lodash/startCase";
import { Map } from "immutable";
import ControllerContext from "../ModelFormController";
import merge from "lodash/fp/merge";
import Typography from "@material-ui/core/Typography";

export default function ModelSelector(props) {
  const {
    name,
    onChange,
    readOnly,
    onLabelClick,
    disabled,
    renderLabel,
    value,
    label,
    placeholder,
    queryOpts: queryOptions = {},
    sorter,
    filter
  } = props;
  const labelText = label || startCase(props.name);
  const [state, setState] = React.useState({
    options: [],
    selectedModelValue: null
  });
  const { getModelSchema } = React.useContext(ControllerContext);
  const { dataFilter, limit = 150, ...queryOpts } = queryOptions;
  const modelSchema = getModelSchema(name);
  const modelFlatFields = modelSchema.basicFieldsString;
  if (!modelFlatFields) throw `Flat Field for "${name}" not found`;
  const { queryKey, query } = React.useMemo(() => {
    const queryKey = "LIST_" + upperCase(`${name}`).replace(/ /g, "_");
    return {
      query: gql`
    query ${queryKey} ($limit: Int, $filter: Model${name}FilterInput, $nextToken: String){
      list:list${name}s(limit: $limit, filter: $filter, nextToken: $nextToken){
        nextToken
        items{
        ${modelFlatFields}
        }
      }
    }
  `,
      queryKey
    };
  }, [name]);

  //convert to fragment
  const apolloClient = useApolloClient();
  React.useEffect(() => {
    let um = false;
    (async () => {
      console.log(">>ModelSelector/index::", "value", value); //TRACE
      if (!value || state.selectedModelValue) return;
      const valueModel = await apolloClient.query({
        query: gql`
          {
            value: get${name}(id:"${value}"){
              ${modelFlatFields}
            }
          }
        `
      });
      setState(oldState => ({
        ...oldState,
        selectedModelValue: get(valueModel, "data.value")
      }));
    })();
    return () => (um = true);
  }, [name, value]);

  const sorterFn = React.useMemo(() => {
    if (sorter) return sorter;
    return () => {};
  }, [sorter]);

  const filterFn = React.useMemo(() => {
    if (filter) return filter;
    return () => true;
  }, [filter]);

  const { data, fetchMore, networkStatus } = useQuery(
    query,
    merge({
      variables: { limit, filter: dataFilter },
      notifyOnNetworkStatusChange: true
    })(queryOpts)
  );

  const loading = networkStatus !== 7;

  function asOption(modelItem) {
    const label = renderLabel ? renderLabel(modelItem) : modelItem.id;
    return {
      label,
      value: modelItem
    };
  }

  React.useEffect(() => {
    const nextToken = get(data, "list.nextToken");
    if (nextToken) {
      Promise.delay(200).then(() => {
        fetchMore({
          variables: {
            nextToken
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            const newNextToken = get(fetchMoreResult, "list.nextToken");
            const newList = get(fetchMoreResult, "list.items", []);
            const oldList = get(prev, "list.items", []);
            const newData = {
              ...prev,
              list: {
                ...prev.list,
                nextToken: newNextToken,
                items: [...oldList, ...newList]
              }
            };
            return newData;
          }
        });
      });
    }
  }, [data]);

  const handleModelInputChange = React.useCallback(
    e => {
      onChange && onChange(e ? e.value : null);
    },
    [onChange]
  );

  const theOpts = React.useMemo(() => {
    const tmp = [];
    const { selectedModelValue } = state;
    let selectedHasAdded = !selectedModelValue;
    get(data, "list.items", []).forEach(modelItem => {
      tmp.push(asOption(modelItem));
      if (!selectedHasAdded) {
        selectedHasAdded =
          get(modelItem, "id") === get(selectedModelValue, "id");
      }
    });

    if (!selectedHasAdded && selectedModelValue) {
      tmp.push(asOption(selectedModelValue));
    }

    return tmp.filter(filterFn).sort(sorterFn);
  }, [state.selectedModelValue, sorterFn, filterFn, data]);

  let ph = "Loading...";
  if (!loading) {
    ph = placeholder ? placeholder : `Select ${startCase(name)}`;
  }

  const readOnlyLabel = React.useMemo(() => {
    if (!readOnly) return;
    if (!state.selectedModelValue) return "...";
    const readOnlyValue = asOption(state.selectedModelValue);
    return (
      <a
        href="#"
        style={{ textDecoration: "none" }}
        onClick={e => {
          e.preventDefault();
          onLabelClick && onLabelClick(e);
        }}
      >
        {readOnlyValue.label}
      </a>
    );
  }, [readOnly, onLabelClick, state.selectedModelValue]);

  return (
    <div style={{ marginTop: 10 }}>
      <label>{labelText}</label>
      {readOnly ? (
        <Typography>{readOnlyLabel}</Typography>
      ) : (
        <Select
          value={value}
          disabled={disabled}
          optionKey="value.id"
          cacheOptions
          isLoading={loading}
          options={theOpts}
          isClearable
          placeholder={ph}
          defaultOptions
          // onSelectedModelChange={handleSelectedModelChange}
          onChange={handleModelInputChange}
        />
      )}
    </div>
  );
}
