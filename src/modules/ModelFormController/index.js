import React from "react";
import { Map } from "immutable";
import get from "lodash/get";

const ModelFormControllerContext = React.createContext();

let objectTypes;

export function ModelFormControllerProvider(props) {
  const { schema } = props;
  const [formMap, setFormMap] = React.useState(Map({}));

  // console.log('>>ModelFormController/index::', 'schema', schema); //TRACE

  const contextState = React.useMemo(
    () => ({
      schema,
      formMap: formMap.toJS(),
      setFormMap,
      getModelSchema(name) {
        if (!objectTypes) {
          objectTypes = get(schema, "data.__schema.types", []).filter(o => {
            if (o.kind !== "OBJECT") return;
            if (o.fields.find(f => f.name === "id") === undefined) return;
            return true;
          });
        }
        const objectType = objectTypes.find(objType => objType.name === name);
        const flatFields = get(objectType, "fields", []).filter(f => {
          const kind = get(f, "type.ofType.kind") || get(f, "type.kind");
          return kind !== "OBJECT";
        });
        return {
          model: objectType,
          flatFields,
          basicFieldsString:
            `    ` +
            flatFields.map(f => f.name).join(`
        `)
        };
      }
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
