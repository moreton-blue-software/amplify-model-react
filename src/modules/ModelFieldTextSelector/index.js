import React from "react";
import { ModelFormContext } from "../ModelForm";
import startCase from "lodash/startCase";
import Select from "../Select";

export default function ModelFieldTextSelector(props) {
  const { disabled, label, placeholder, field, options } = props;
  const labelText = label || startCase(field);
  const { handlers } = React.useContext(ModelFormContext);
  const handleChange = React.useCallback(
    item => {
      handlers.setFieldValue(field, item ? item.value : null);
    },
    [handlers]
  );
  return (
    <div style={{ marginTop: 10 }}>
      <label>{labelText}</label>
      <Select
        isDisabled={disabled}
        value={handlers.getFieldValue(field)}
        isClearable
        onChange={handleChange}
        placeholder={placeholder ? placeholder : `Select the ${labelText}`}
        options={options}
      />
    </div>
  );
}
