import React from 'react';
import ReactSelect from 'react-select';
import keyBy from 'lodash/keyBy';

export default function Select(props) {
  const { value: rawValue, optionKey = 'value', disabled, ...rest } = props;
  const optMap = React.useMemo(() => keyBy(rest.options, optionKey), [rest.options]);
  const value = React.useMemo(() => optMap[rawValue], [rawValue, optMap]);
  return <ReactSelect {...rest} isDisabled={disabled} value={value} />;
}
