import React from "react";
import Select from "../Select";
import { useQuery } from "react-apollo-hooks";
import get from "lodash/get";
import gql from "graphql-tag";
import upperCase from "lodash/upperCase";
import startCase from "lodash/startCase";
import { Map } from "immutable";
import ControllerContext from "../ModelFormController";

export default function ModelSelector(props) {
  const {
    name,
    onChange,
    disabled,
    renderLabel,
    limit = 100,
    value,
    label
  } = props;
  const labelText = label || startCase(props.name);
  const { getModelSchema } = React.useContext(ControllerContext);

  const modelSchema = getModelSchema(name);
  const modelFlatFields = modelSchema.basicFieldsString;
  if (!modelFlatFields) throw `Flat Field for "${name}" not found`;
  const { queryKey, query } = React.useMemo(() => {
    const queryKey = "LIST_" + upperCase(`${name}`);
    console.log("queryKey", queryKey); //TRACE
    return {
      query: gql`
    query ${queryKey}{
      list:list${name}s(limit: ${limit}){
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

  const { data, loading } = useQuery(query);
  const { options } = React.useMemo(() => {
    const options = [];
    get(data, "list.items", []).forEach(modelItem => {
      const label = renderLabel ? renderLabel(modelItem) : modelItem.id;
      const item = {
        label,
        value: modelItem
      };
      options.push(item);
    });
    return { options };
  }, [data]);
  const handleModelInputChange = React.useCallback(
    e => {
      onChange && onChange(e.value);
    },
    [onChange]
  );

  return (
    <div style={{ marginTop: 10 }}>
      <label>{labelText}</label>
      <Select
        value={value}
        disabled={disabled}
        optionKey="value.id"
        cacheOptions
        isLoading={loading}
        options={options}
        placeholder={`Select ${startCase(name)}`}
        defaultOptions
        onChange={handleModelInputChange}
      />
    </div>
  );
}
