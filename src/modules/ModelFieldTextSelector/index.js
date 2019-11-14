import React from 'react';
import startCase from 'lodash/startCase';
import Select from '../Select';
import { useModelForm } from 'modules/ModelForm';
import { FormHelperText } from '@material-ui/core';

export default function ModelFieldTextSelector(props) {
  const { disabled, label, placeholder, field, options, selectProps = {} } = props;
  const labelText = label || startCase(field);
  const { form, control } = useModelForm({ field });
  const { handlers } = form;
  const { errors, hasErrors } = control;

  const handleChange = React.useCallback(
    item => {
      handlers.setFieldValue(field, item ? item.value : null);
      control && control.setTouched(true);
    },
    [field, handlers, control]
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
        {...selectProps}
      />
      {hasErrors && (
        <FormHelperText style={{ color: 'red' }}>
          {errors.map(error => {
            return error;
          })}
        </FormHelperText>
      )}
    </div>
  );
}
