import React from "react";
import { Map } from "immutable";

const ModelFormControllerContext = React.createContext();

export function ModelFormControllerProvider(props) {
  const { schema } = props;
  const [formMap, setFormMap] = React.useState(Map({}));
  // console.log('>>ModelFormController/index::', 'schema', schema); //TRACE
  const contextState = React.useMemo(
    () => ({
      schema,
      formMap: formMap.toJS(),
      setFormMap
    }),
    [formMap]
  );
  return (
    <ModelFormControllerContext.Provider value={contextState}>
      {props.children}
    </ModelFormControllerContext.Provider>
  );
}
export default ModelFormControllerContext;
