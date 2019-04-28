import React from "react";
import {
  toKey,
  composeCreateMutation,
  composeUpdateMutation,
  composeDeleteMutation
} from "../common/graphql/Base";
import Promise from "bluebird";
import { Map, List } from "immutable";
import { useApolloClient, useMutation, useQuery } from "react-apollo-hooks";
import omit from "lodash/omit";
import get from "lodash/get";
import gql from "graphql-tag";
import nanoid from "nanoid";
import ModelFormControllerContext from "../ModelFormController";

const NOISE_FIELDS = ["__typename", "createdAt", "updatedAt", "videoFile"];

let objectTypes;
const flatFields = {};

export const ModelFormContext = React.createContext();

const ModelForm = React.memo(function(props) {
  const {
    name,
    modelId: modelIdTmp,
    onSave,
    defaultModelValue,
    beforeSave,
    afterSave,
    additionalFields = "",
    schemaInfo
  } = props;
  const [ctxId] = React.useState(`${name}-${nanoid()}`);
  const [state, setState] = React.useState(Map({}));
  const [formData, setFormData] = React.useState(Map(defaultModelValue || {}));
  const [childrenMap, setChildrenMap] = React.useState(Map({}));
  const [childContexts, setChildContexts] = React.useState([]);
  const [beforeSaveHandlers, setBeforeSaveHandlers] = React.useState(List([]));
  // console.log(">>ModelForm/index::", "form re-rendered", name, schemaInfo); //TRACE
  React.useEffect(() => {
    const beforeSaveObj = { precedence: Infinity, fn: beforeSave }; //precedence Infinity = it will execute last
    // add
    beforeSave &&
      setBeforeSaveHandlers(oldState => oldState.push(beforeSaveObj));
    return () => {
      //remove
      beforeSave &&
        setBeforeSaveHandlers(oldState => {
          const idx = oldState.findIndex(obj => obj === beforeSaveObj);
          return oldState.delete(idx);
        });
    };
  }, [beforeSave]);

  const modelId = get(defaultModelValue, "id", modelIdTmp);
  const editMode = !!modelId;
  const mutation = editMode
    ? composeUpdateMutation(name)
    : composeCreateMutation(name);

  const apolloClient = useApolloClient();
  const saveMutation = useMutation(mutation);

  const parentModelContext = React.useContext(ModelFormContext);
  const hasParent = !!parentModelContext;

  const { basicFieldsString } = schemaInfo;
  if (!basicFieldsString) throw `Flat Field for "${name}" not found`;
  const { queryKey, query } = React.useMemo(() => {
    const queryKey = "GET_" + toKey(name);
    // console.log("queryKey", queryKey); //TRACE
    return {
      query: gql`
    query ${queryKey}{
      model:get${name}(id:"${modelId}"){
        ${basicFieldsString}
        ${additionalFields}
      }
    }
  `,
      queryKey
    };
  }, [name, modelId]);

  const { data, loading } = useQuery(query, {
    notifyOnNetworkStatusChange: true,
    skip: !editMode // || (modelId && defaultModelValue),
  });
  // console.log("formData.toJS()", formData.toJS()); //TRACE

  //Fetch model data for editting
  React.useEffect(() => {
    const modelData = get(data, "model", {});
    setFormData(oldFormData => oldFormData.merge(modelData));
  }, [data, editMode]);

  const handlers = React.useMemo(
    () => ({
      setChildrenMap,
      attachBeforeSave(fn, precedence) {
        return setBeforeSaveHandlers(oldState =>
          oldState.push({ fn, precedence })
        );
      },
      detachBeforeSave(fn) {
        return setBeforeSaveHandlers(oldState => {
          const idx = oldState.findIndex(obj => obj === fn);
          return oldState.delete(idx);
        });
      },
      async setFormData(formData) {
        return setFormData(oldFormData => oldFormData.merge(formData));
      },
      async setFieldValue(fieldPath, value) {
        return setFormData(oldFormData =>
          oldFormData.setIn(fieldPath.split("."), value)
        );
      },
      getFieldValue(fieldPath, ...args) {
        return formData.getIn(fieldPath.split("."), ...args);
      },
      async _saveModel(options = {}) {
        const { refetchQueries, savedParentId, noRefetch } = options;
        const formDataJson = formData.toJS();
        const formDataClean = omit(formDataJson, NOISE_FIELDS);
        let parentData = get(parentModelContext, "data", {});
        // update parent data id from saved model
        if (savedParentId) {
          parentData.id = savedParentId;
        }
        let beforeSaveData = {};
        for (let beforeSaveObj of beforeSaveHandlers
          .sortBy(o => o.precedence)
          .toJS()) {
          const beforeSaveDataTmp = await Promise.resolve(
            beforeSaveObj.fn({
              context: { data: formDataClean },
              parent: { data: parentData }
            })
          );
          if (beforeSaveDataTmp === false) {
            // console.log("saving canceled"); //TRACE
            return;
          }
          beforeSaveData = { ...beforeSaveData, ...beforeSaveDataTmp };
        }
        // console.log("saving beforeSaveData", beforeSaveData); //TRACE
        const ret = await saveMutation({
          variables: {
            input: { ...formDataClean, ...beforeSaveData }
          },
          refetchQueries
        });
        // console.log("childContexts", childContexts); //TRACE

        const savedId = get(ret, "data.model.id");
        //save children models
        await Promise.map(childContexts || [], childCtx => {
          return childCtx.handlers._saveModel({
            savedParentId: savedId,
            noRefetch: true
          });
        });
        formDataClean.id = savedId;
        afterSave &&
          (await afterSave({
            context: { data: formDataClean },
            parent: { data: parentData }
          }));

        if (!noRefetch)
          await apolloClient.queryManager.refetchQueryByName(queryKey);

        // console.log("ret", ret); //TRACE
        return savedId;
      },
      async save(options = {}) {
        await setState(oldState => oldState.merge({ saving: true }));
        const savedId = await handlers._saveModel(options);
        await setState(oldState => oldState.merge({ saving: false }));
        onSave && onSave(savedId);
        return savedId;
      }
    }),
    [
      get(parentModelContext, "data"),
      formData,
      childContexts,
      beforeSaveHandlers,
      afterSave
    ]
  );
  // console.log("childContexts", childContexts); //TRACE
  const formDataJS = React.useMemo(() => formData.toJS(), [formData]);
  const stateJS = React.useMemo(
    () => ({ ...state.toJS(), loading, editMode }),
    [state, loading, editMode]
  );
  const childrenMapJS = React.useMemo(() => childrenMap.toJS(), [childrenMap]);

  const contextState = React.useMemo(() => {
    return {
      ctxId,
      name,
      data: formDataJS,
      state: stateJS,
      parent: parentModelContext,
      childrenMap: childrenMapJS,
      handlers
    };
  }, [formDataJS, stateJS, childrenMapJS, handlers]);

  //Add this context to parent context's children
  React.useEffect(() => {
    // console.log("parentModelContext", parentModelContext); //TRACE
    console.log("mf: mounted");

    parentModelContext &&
      parentModelContext.handlers.setChildrenMap(oldMap =>
        oldMap.set(ctxId, true)
      );
    // remove
    return () => {
      console.log("mf: unmounted");
      parentModelContext &&
        parentModelContext.handlers.setChildrenMap(oldMap =>
          oldMap.delete(ctxId)
        );
    };
  }, []);
  // console.log("contextState", contextState); //TRACE

  const handleChildContextChange = React.useCallback(ctxs => {
    setChildContexts(ctxs);
  }, []);

  const contextStateExtended = React.useMemo(() => {
    return { ...contextState, childContexts: childContexts || [] };
  }, [contextState, childContexts]);

  return (
    <ModelFormContext.Provider value={contextStateExtended}>
      <ControllerWatcher
        contextState={contextState}
        onChildContextsChange={handleChildContextChange}
      />
      {hasParent ? props.children : <form>{props.children}</form>}
    </ModelFormContext.Provider>
  );
});

// function BeforeSaveHandlersWatcher(props) {
//   const [state, setState] = React.useState(Map({}));
// }

function ControllerWatcher(props) {
  const { contextState, onChildContextsChange } = props;
  const { formMap, setFormMap } = React.useContext(ModelFormControllerContext);
  const [state, setState] = React.useState(Map({ childContexts: null }));

  //Add this context to controller map
  React.useEffect(() => {
    const { parent, ctxId } = contextState || {};
    if (parent) setFormMap(oldFormMap => oldFormMap.set(ctxId, contextState));
    // remove
    return () => {
      setFormMap(oldFormMap => oldFormMap.delete(ctxId));
    };
  }, [contextState]);
  const childrenMap = get(contextState, "childrenMap");
  // console.log("childrenMap", childrenMap); //TRACE
  const childrenCtxKeys = React.useMemo(() => {
    if (!childrenMap) return [];
    return Object.keys(childrenMap).sort();
  }, [childrenMap]);
  // console.log("childrenCtxKeys", childrenCtxKeys); //TRACE
  React.useEffect(() => {
    const childContexts = state.get("childContexts");
    const newChildContexts = [];
    childrenCtxKeys.forEach(k => {
      newChildContexts.push(formMap[k]);
    });

    if (newChildContexts.length === 0 && childContexts === null) return;

    setState(oldState => oldState.merge({ childContexts: newChildContexts }));
  }, [childrenCtxKeys, formMap]);

  React.useEffect(() => {
    onChildContextsChange && onChildContextsChange(state.get("childContexts"));
  }, [state.get("childContexts")]);

  return null;
}

export default function(props) {
  const { name } = props;
  const [schemaInfo, setSchemaInfo] = React.useState();
  const { schema } = React.useContext(ModelFormControllerContext);

  React.useEffect(() => {
    if (!objectTypes) {
      objectTypes = schema.data.__schema.types.filter(o => {
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
    setSchemaInfo({
      model: objectType,
      flatFields,
      basicFieldsString:
        `    ` +
        flatFields.map(f => f.name).join(`
    `)
    });
  }, [schema]);

  if (!schemaInfo) return <div>Loading model ${name}..</div>;
  return <ModelForm {...props} schemaInfo={schemaInfo} />;
}
