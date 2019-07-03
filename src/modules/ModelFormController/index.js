import React, { createProvider } from "reactn";
import get from "lodash/get";
import merge from "lodash/fp/merge";
import UtilLoader from "../UtilLoader";

export const ModelFormGlobalProvider = createProvider({
  formMap: {}
});

const ModelFormControllerContext = React.createContext();

let objectTypes;

export function ModelFormControllerProvider(props) {
  const { schema } = props;
  // console.log('>>ModelFormController/index::', 'schema', schema); //TRACE

  const [formMap, _setFormMap] = ModelFormGlobalProvider.useGlobal("formMap");

  const contextState = React.useMemo(
    () => ({
      schema,
      formMap: formMap,
      getFormMap() {
        return ModelFormGlobalProvider.getGlobal().formMap;
      },
      setFormMap(formData) {
        _setFormMap(
          merge(ModelFormGlobalProvider.getGlobal().formMap)(formData)
        );
      },
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
      <UtilLoader />
    </ModelFormControllerContext.Provider>
  );
}
export default ModelFormControllerContext;
