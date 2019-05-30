import React from "react";
import ReactSelect from "react-select";
import keyBy from "lodash/keyBy";

export default function Select(props) {
  const {
    value: rawValue,
    optionKey = "value",
    onSelectedModelChange,
    disabled,
    ...rest
  } = props;
  const [state, setState] = React.useState({ optMap:[] });
  const { optMap } = state;

  React.useEffect(() => {
    setState(oldState => ({
      ...oldState,
      optMap: keyBy(rest.options, optionKey)
    }));
  }, [rest.options]);

  const value = React.useMemo(() => optMap[rawValue], [rawValue, optMap]);

  React.useEffect(() => {
    onSelectedModelChange && onSelectedModelChange(value);
  }, [value]);

  return <ReactSelect {...rest} isDisabled={disabled} value={value} />;
}
