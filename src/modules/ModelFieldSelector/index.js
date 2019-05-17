import React from "react";
import ModelSelector from "../ModelSelector";
import { ModelFormContext } from "../ModelForm";

export default function ModelFieldSelector(props) {
  const {
    name,
    disabled,
    renderLabel,
    label,
    field,
    placeholder,
    queryOpts,
    sorter
  } = props;
  const { handlers } = React.useContext(ModelFormContext);
  const handleChange = React.useCallback(
    item => {
      handlers.setFieldValue(field, item.id);
    },
    [handlers]
  );
  return (
    <ModelSelector
      name={name}
      disabled={disabled}
      renderLabel={renderLabel}
      value={handlers.getFieldValue(field)}
      onChange={handleChange}
      label={label}
      placeholder={placeholder}
      queryOpts={queryOpts}
      sorter={sorter}
    />
  );
}
