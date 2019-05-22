import React from "react";
import { ModelFormContext } from "../ModelForm";
import startCase from "lodash/startCase";
import FormControl from "@material-ui/core/FormControl";
import padStart from "lodash/padStart";
import { DateTimePicker, DatePicker } from "material-ui-pickers";

export default function ModelFieldDateTime(props) {
  const {
    field,
    dateOnly = false,
    label,
    strictDate = false,
    pickerProps = {}
  } = props;
  const labelText = label || startCase(field);
  const { handlers } = React.useContext(ModelFormContext);
  const rawValue = handlers.getFieldValue(field);
  const Picker = dateOnly ? DatePicker : DateTimePicker;
  const value = rawValue ? new Date(rawValue) : "";
  const checkDate = React.useCallback(
    mDate => {
      // if (!mDate || !mDate._d) return;
      const minuteOffset = mDate.getTimezoneOffset();
      let date = new Date(mDate.getTime());
      date.setMinutes(date.getMinutes() + minuteOffset);
      let month = padStart(date.getMonth() + 1, 2, "0");
      let day = padStart(date.getDate(), 2, "0");
      const year = date.getFullYear();
      const hours = padStart(date.getHours(), 2, "0");
      const minutes = padStart(date.getMinutes(), 2, "0");
      let awsDate = `${year}-${month}-${day}`;
      const awsDateTime = awsDate + `T${hours}:${minutes}:00.000Z`;
      if (strictDate === false) awsDate = awsDate + `T00:00:00.000Z`;
      handlers.setFieldValue(field, dateOnly ? awsDate : awsDateTime);
    },
    [field, handlers]
  );
  return (
    <div>
      <FormControl fullWidth>
        <Picker
          {...pickerProps}
          value={value === "" ? null : value}
          onChange={checkDate}
          label={labelText}
        />
      </FormControl>
    </div>
  );
}
