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
import get from "lodash/get";
import gql from "graphql-tag";
import nanoid from "nanoid";
import ModelFormControllerContext, {
  ModelFormGlobalProvider
} from "../ModelFormController";
import remove from "lodash/fp/remove";
import set from "lodash/fp/set";
import pick from "lodash/pick";
import omit from "lodash/fp/omit";

// const NOISE_FIELDS = ["__typename", "createdAt", "updatedAt", "videoFile"];

export const ModelFormContext = React.createContext();

function getChildContextsById(parentId) {
  const { formMap } = ModelFormGlobalProvider.getGlobal();
  return Object.values(formMap).filter(ctx => {
    const parentCtxId = get(ctx, "parent.ctxId");
    return parentCtxId === parentId;
  });
}

const ModelForm = React.memo(function(props) {
  const {
    name,
    modelId: modelIdTmp,
    onSave,
    onChange,
    defaultModelValue,
    beforeSave,
    afterSave,
    additionalFields = "",
    schemaInfo
  } = props;
  const [ctxId] = React.useState(`${name}-${nanoid()}`);
  const [state, setState] = React.useState({});
  const [formData, setFormData] = React.useState(defaultModelValue || {});
  const [childrenMap, setChildrenMap] = React.useState({});
  const [childContexts, setChildContexts] = React.useState([]);
  const [beforeSaveHandlers, setBeforeSaveHandlers] = React.useState(List([]));
  const [afterSaveHandlers, setAfterSaveHandlers] = React.useState(List([]));

  React.useEffect(() => {
    onChange && onChange(formData);
  }, [formData]);

  //attach before save
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

  //attach after save
  React.useEffect(() => {
    const afterSaveObj = { precedence: Infinity, fn: afterSave }; //precedence Infinity = it will execute last
    // add
    afterSave && setAfterSaveHandlers(oldState => oldState.push(afterSaveObj));
    return () => {
      //remove
      afterSave &&
        setAfterSaveHandlers(oldState => {
          const idx = oldState.findIndex(obj => obj === afterSaveObj);
          return oldState.delete(idx);
        });
    };
  }, [afterSave]);

  const modelId = get(defaultModelValue, "id", modelIdTmp);
  const editMode = !!modelId;
  // const mutation = editMode
  //   ? composeUpdateMutation(name)
  //   : composeCreateMutation(name);

  const apolloClient = useApolloClient();
  // const saveMutation = useMutation(mutation);

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

  const { data, loading, refetch } = useQuery(query, {
    skip: !editMode // || (modelId && defaultModelValue),
  });
  // console.log("formData.toJS()", formData.toJS()); //TRACE

  //Fetch model data for editting
  React.useEffect(() => {
    const modelData = get(data, "model", {});
    setFormData(oldModelData => ({ ...oldModelData, ...modelData }));
  }, [data, editMode]);

  React.useEffect(() => {
    console.log(">>ModelForm/index::", "ctx childContexts", childContexts); //TRACE
  }, [childContexts]);

  const handlers = React.useMemo(
    () => ({
      setChildrenMap,
      getChildContexts() {
        return getChildContextsById(ctxId);
      },
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
      attachAfterSave(fn, precedence) {
        return setAfterSaveHandlers(oldState =>
          oldState.push({ fn, precedence })
        );
      },
      detachAfterSave(fn) {
        return setAfterSaveHandlers(oldState => {
          const idx = oldState.findIndex(obj => obj === fn);
          return oldState.delete(idx);
        });
      },
      async setFormData(formData) {
        return setFormData(formData);
      },
      async setFieldValue(fieldPath, value) {
        return setFormData(set(fieldPath, value));
      },
      getFieldValue(fieldPath, ...args) {
        return get(formData, fieldPath, ...args);
      },
      async _saveModel(options = {}) {
        const { refetchQueries, savedParentId, noRefetch } = options;
        const formDataJson = formData;

        const objFields = get(
          query,
          "definitions.0.selectionSet.selections.0.selectionSet.selections",
          []
        )
          .filter(f => {
            return !f.selectionSet;
          })
          .map(f => get(f, "name.value"));

        const formDataClean = pick(formDataJson, [...objFields]);

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
        const input = { ...formDataClean, ...beforeSaveData };
        const mutation = !!input.id
          ? composeUpdateMutation(name)
          : composeCreateMutation(name);
        const ret = await apolloClient.mutate({
          mutation,
          variables: {
            input
          },
          refetchQueries
        });

        const savedId = get(ret, "data.model.id");
        const { formMap } = ModelFormGlobalProvider.getGlobal();
        //save children models
        await Promise.map(childContexts || [], childCtxKey => {
          const childCtx = formMap[childCtxKey];

          return childCtx.handlers._saveModel({
            savedParentId: savedId,
            noRefetch: true
          });
        });
        formDataClean.id = savedId;
        // afterSave &&
        //   (await afterSave({
        //     context: { data: formDataClean },
        //     parent: { data: parentData }
        //   }));
        for (let afterSaveObj of afterSaveHandlers
          .sortBy(o => o.precedence)
          .toJS()) {
          await Promise.resolve(
            afterSaveObj.fn({
              context: { data: formDataClean },
              parent: { data: parentData }
            })
          );
        }

        if (!noRefetch) await refetch();
        // await apolloClient.queryManager.ref.refetchQueryByName(queryKey);

        // console.log("ret", ret); //TRACE
        return savedId;
      },
      async save(options = {}) {
        await setState(set("saving", true));
        const savedId = await handlers._saveModel(options);
        await setState(set("saving", false));
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
  const formDataJS = formData;
  const stateJS = React.useMemo(() => ({ ...state, loading, editMode }), [
    state,
    loading,
    editMode
  ]);
  const childrenMapJS = childrenMap;
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
    parentModelContext &&
      parentModelContext.handlers.setChildrenMap(set(ctxId, true));
    // remove
    return () => {
      console.log(">>ModelForm/index::", "unmounted", ctxId); //TRACE
      parentModelContext &&
        parentModelContext.handlers.setChildrenMap(omit([ctxId]));
    };
  }, []);
  // console.log("contextState", contextState); //TRACE

  const handleChildContextChange = React.useCallback(ctxs => {
    setChildContexts(ctxs);
  }, []);

  return (
    <ModelFormContext.Provider value={contextState}>
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
  const { setFormMap, getFormMap } = React.useContext(
    ModelFormControllerContext
  );
  const [state, setState] = React.useState({ childContexts: null });
  //Add this context to controller map
  React.useEffect(() => {
    const { parent, ctxId } = contextState || {};
    if (parent) setFormMap({ [ctxId]: contextState });
    // remove
    return () => {
      setFormMap(omit([ctxId])(getFormMap()));
    };
  }, [contextState]);

  const childrenMap = get(contextState, "childrenMap");

  React.useEffect(() => {
    const keys = Object.keys(childrenMap || []).sort();
    onChildContextsChange && onChildContextsChange(keys || []);
  }, [childrenMap]);

  return null;
}

export default function(props) {
  const { name } = props;
  const [schemaInfo, setSchemaInfo] = React.useState();
  const { schema, getModelSchema } = React.useContext(
    ModelFormControllerContext
  );

  React.useEffect(() => {
    const info = getModelSchema(name);
    setSchemaInfo(info);
  }, [schema, name]);

  if (!schemaInfo) return <div>Loading model ${name}..</div>;
  return <ModelForm {...props} schemaInfo={schemaInfo} />;
}
