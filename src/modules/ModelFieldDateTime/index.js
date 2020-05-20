import React from 'react';
import { useModelForm } from '../ModelForm';
import startCase from 'lodash/startCase';
import FormControl from '@material-ui/core/FormControl';
import padStart from 'lodash/padStart';
import FormHelperText from '@material-ui/core/FormHelperText';
import { DateTimePicker, DatePicker } from '@material-ui/pickers';
import { useRequiredTagText } from '../common/RequiredTag';

export default function ModelFieldDateTime(props) {
  const {
    field,
    dateOnly: dateOnlyTmp = false,
    label,
    strictDate = false,
    pickerProps = {},
  } = props;
  const labelText = label || startCase(field);
  const { form, control } = useModelForm({ field });
  const { handlers } = form;
  const rawValue = handlers.getFieldValue(field);
  const dateOnly = strictDate || dateOnlyTmp;
  const Picker = dateOnly ? DatePicker : DateTimePicker;
  const value = rawValue ? new Date(rawValue) : '';
  const checkDate = React.useCallback(
    mDate => {
      control && control.setTouched(true);
      // if (!mDate || !mDate._d) return;
      const minuteOffset = mDate.getTimezoneOffset();
      const date = new Date(mDate.getTime());
      date.setMinutes(date.getMinutes() + minuteOffset);
      const month = padStart(date.getMonth() + 1, 2, '0');
      const day = padStart(date.getDate(), 2, '0');
      const year = date.getFullYear();
      const hours = padStart(date.getHours(), 2, '0');
      const minutes = padStart(date.getMinutes(), 2, '0');
      let awsDate = `${year}-${month}-${day}`;
      const awsDateTime = awsDate + `T${hours}:${minutes}:00.000Z`;
      if (strictDate === false) awsDate = awsDate + 'T00:00:00.000Z';
      handlers.setFieldValue(field, dateOnly ? awsDate : awsDateTime);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [field, handlers]
  );

  const requiredText = useRequiredTagText();

  return (
    <div>
      <FormControl fullWidth>
        <Picker
          {...pickerProps}
          value={value === '' ? null : value}
          onChange={checkDate}
          label={labelText + (control.required ? requiredText : '')}
          error={control.hasError}
        />
        {control.hasErrors && (
          <FormHelperText style={{ color: 'red' }}>
            {control.errors.map(error => {
              return error;
            })}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
}
