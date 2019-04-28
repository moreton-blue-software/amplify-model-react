import React from "react";
import { ModelFormContext } from "../ModelForm";
import capitalize from "lodash/capitalize";
import debounce from "lodash/debounce";
import TextField from "@material-ui/core/TextField";

export default function ModelFieldInput(props) {
  const { field, label, disabled, format } = props;
  const { state, handlers } = React.useContext(ModelFormContext);
  const [txt, setTxt] = React.useState("");

  const defaultValue = handlers.getFieldValue(field, "");
  const inputId = `${handlers.getFieldValue("id")}@${field}`;

  React.useEffect(() => {
    setTxt(defaultValue);
  }, [defaultValue]);

  const updateField = debounce(targetValue => {
    handlers.setFieldValue(targetValue.id, targetValue.value);
  }, 200);

  const handleInputChange = React.useCallback(e => {
    const { id, value } = e.target;
    setTxt(value);
    updateField({ id, value });
  }, []);

  const formattedValue = React.useMemo(() => {
    const txtValue = txt || "";
    if (format) return format(txtValue);
    return txtValue;
  }, [format, txt]);

  return (
    <div>
      <label>{label || capitalize(field)}</label>
      <TextField
        // success={this.state.requiredState === 'success'}
        // error={this.state.requiredState === 'error'}

        id={field}
        key={inputId}
        fullWidth
        inputProps={{
          id: field,
          key: inputId,
          disabled,
          onChange: handleInputChange,
          value: formattedValue
        }}
      />
    </div>
  );
}
