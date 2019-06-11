import React from "react";
import ModelSelector from "../ModelSelector";
import { ModelFormContext, useModelForm } from "../ModelForm";
import FormHelperText from "@material-ui/core/FormHelperText";

export default function ModelFieldSelector(props) {
  const {
    name,
    readOnly,
    onLabelClick,
    disabled,
    renderLabel,
    label,
    field,
    placeholder,
    queryOpts,
    sorter,
    filter //options filter
  } = props;
  const { form, control } = useModelForm({ field });
  const { handlers } = form;
  const { errors, hasErrors } = control;

  const handleChange = React.useCallback(
    item => {
      handlers.setFieldValue(field, item ? item.id : null);
      control && control.setTouched(true);
    },
    [handlers]
  );
  return (
    <div>
      <ModelSelector
        name={name}
        readOnly={readOnly}
        onLabelClick={onLabelClick}
        disabled={disabled}
        renderLabel={renderLabel}
        value={handlers.getFieldValue(field)}
        onChange={handleChange}
        label={label}
        placeholder={placeholder}
        queryOpts={queryOpts}
        sorter={sorter}
        filter={filter}
      />
      {hasErrors && (
        <FormHelperText style={{ color: "red" }}>
          {errors.map(error => {
            return error;
          })}
        </FormHelperText>
      )}
    </div>
  );
}
