import React from 'react';
import { useModelForm } from '../ModelForm';
import capitalize from 'lodash/capitalize';
import debounce from 'lodash/debounce';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import RequiredTag from './../common/RequiredTag';

const useStyle = makeStyles(theme => ({
  root: {
    color: props => (props.hasErrors ? theme.palette.error.main : 'inherit'),
    '& > p': {
      color: 'inherit'
    }
  }
}));
export default function ModelFieldInput(props) {
  const { field, label, disabled, format } = props;
  const { form, control } = useModelForm({ field });
  const { handlers } = form;

  const { errors, hasErrors } = control;

  const classes = useStyle({ hasErrors });

  const [txt, setTxt] = React.useState('');

  const defaultValue = handlers.getFieldValue(field, '');
  const inputId = `${handlers.getFieldValue('id')}@${field}`;

  React.useEffect(() => {
    setTxt(defaultValue);
  }, [defaultValue]);

  const updateField = debounce(targetValue => {
    handlers.setFieldValue(
      targetValue.id,
      targetValue.value === '' ? null : targetValue.value
    );
  }, 200);

  const handleInputChange = React.useCallback(e => {
    const { id, value } = e.target;
    control && control.setTouched(true);
    setTxt(value);
    updateField({ id, value });
  }, []);

  const formattedValue = React.useMemo(() => {
    const txtValue = txt || '';
    if (format) return format(txtValue);
    return txtValue;
  }, [format, txt]);

  const onBlur = React.useCallback(() => {
    control && control.setTouched(true);
  }, [control]);

  // const Wrapper = React.useMemo(()=>{

  // },[
  //   hasErrors
  // ]);

  return (
    <div className={classes.root}>
      <label>
        {label || capitalize(field)}
        <RequiredTag />
      </label>
      <TextField
        // success={this.state.requiredState === 'success'}
        // error={this.state.requiredState === 'error'}
        error={hasErrors}
        id={field}
        key={inputId}
        fullWidth
        inputProps={{
          id: field,
          key: inputId,
          onBlur: onBlur,
          disabled,
          onChange: handleInputChange,
          value: formattedValue
        }}
      />
      {hasErrors && (
        <FormHelperText>
          {errors.map(error => {
            return error;
          })}
        </FormHelperText>
      )}
    </div>
  );
}
