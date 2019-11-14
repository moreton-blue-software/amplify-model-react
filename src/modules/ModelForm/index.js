import React from 'react';
import { toKey } from '../common/graphql/Base';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';
import gql from 'graphql-tag';
import nanoid from 'nanoid';
import ModelFormControllerContext from '../ModelFormController';
import set from 'lodash/fp/set';
import omit from 'lodash/fp/omit';
import { ModelControlContext } from './../ModelControl';
import useModelFormHandlers from './handlers';

/// const NOISE_FIELDS = ["__typename", "createdAt", "updatedAt", "videoFile"];

export const ModelFormContext = React.createContext();

export function useModelForm({ field } = {}) {
  const form = React.useContext(ModelFormContext);
  const control = React.useContext(ModelControlContext);
  const { setFields } = control || {};
  const hasController = Boolean(control);

  React.useEffect(() => {
    if (hasController && field) {
      setFields(oldFields => ({ ...oldFields, [field]: true }));
    }
  }, [setFields, field, hasController]);

  return {
    form,
    control: control || { setTouched() {} }
  };
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
    additionalFields = '',
    schemaInfo,
    readOnly,
    fetchPolicy
  } = props;
  const [ctxId] = React.useState(`${name}-${nanoid()}`);
  const [state, setState] = React.useState({});
  const [fieldErrors, setFieldErrors] = React.useState({});
  const [formData, setFormData] = React.useState(defaultModelValue || {});
  const [childrenMap, setChildrenMap] = React.useState({});
  const [childContexts, setChildContexts] = React.useState([]);

  React.useEffect(() => {
    onChange && onChange(formData);
  }, [formData, onChange]);

  const modelId = get(defaultModelValue, 'id', modelIdTmp);

  const parentModelContext = React.useContext(ModelFormContext);
  const hasParent = !!parentModelContext;

  const { basicFieldsString } = schemaInfo;
  if (!basicFieldsString) throw `Flat Field for "${name}" not found`;
  const {
    // queryKey,
    query
  } = React.useMemo(() => {
    const queryKey = 'GET_' + toKey(name);
    // console.log("queryKey", queryKey); //TRACE
    return {
      query: gql`
    query ${queryKey} ($modelId: ID!){
      model:get${name}(id:$modelId){
        ${basicFieldsString}
        ${additionalFields}
      }
    }
  `,
      queryKey
    };
  }, [additionalFields, basicFieldsString, name]);

  const { data, loading, refetch } = useQuery(query, {
    skip: !modelId,
    variables: {
      modelId
    },
    fetchPolicy
  });

  //Fetch model data for editting
  React.useEffect(() => {
    const modelData = get(data, 'model', {});
    setFormData(oldModelData => ({ ...oldModelData, ...modelData }));
  }, [data]);

  const editMode = !!get(formData, 'id');

  const handlers = useModelFormHandlers({
    beforeSave,
    afterSave,
    refetch,
    ctxId,
    formData,
    query,
    setChildrenMap,
    setFieldErrors,
    setFormData,
    setState,
    parentModelContext,
    name,
    childContexts,
    onSave
  });

  // console.log("childContexts", childContexts); //TRACE
  const stateJS = React.useMemo(() => {
    return {
      ...state,
      loading,
      editMode,
      readOnly
    };
  }, [state, loading, editMode, readOnly]);

  const contextState = React.useMemo(() => {
    return {
      ctxId,
      name,
      data: formData,
      state: stateJS,
      parent: parentModelContext,
      childrenMap,
      handlers,
      readOnly
    };
  }, [
    ctxId,
    name,
    formData,
    stateJS,
    parentModelContext,
    childrenMap,
    handlers,
    readOnly
  ]);

  contextState.errors = React.useMemo(() => {
    const errors = [];
    Object.entries(fieldErrors).forEach(entry => {
      const [fieldName, errorList] = entry;
      if (errorList && errorList.length > 0) {
        errorList.forEach(err => {
          errors.push({ fieldName, err });
        });
      }
    });
    return errors;
  }, [fieldErrors]);

  contextState.hasErrors = contextState.errors.length > 0;

  //Add this context to parent context's children
  React.useEffect(() => {
    // console.log("parentModelContext", parentModelContext); //TRACE
    parentModelContext && parentModelContext.handlers.setChildrenMap(set(ctxId, true));
    // remove
    return () => {
      console.log('>>ModelForm/index::', 'unmounted', ctxId); //TRACE
      parentModelContext && parentModelContext.handlers.setChildrenMap(omit([ctxId]));
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
  const { setFormMap, getFormMap } = React.useContext(ModelFormControllerContext);
  //Add this context to controller map
  React.useEffect(() => {
    const { parent, ctxId } = contextState || {};
    if (parent) setFormMap({ [ctxId]: contextState });
    // remove
    return () => {
      setFormMap(omit([ctxId])(getFormMap()));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextState]);

  const childrenMap = get(contextState, 'childrenMap');

  React.useEffect(() => {
    const keys = Object.keys(childrenMap || []).sort();
    onChildContextsChange && onChildContextsChange(keys || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenMap]);

  return null;
}

// eslint-disable-next-line react/no-multi-comp
export default function(props) {
  const { name } = props;
  const [schemaInfo, setSchemaInfo] = React.useState();
  const { getModelSchema } = React.useContext(ModelFormControllerContext);

  React.useEffect(() => {
    const info = getModelSchema(name);
    setSchemaInfo(info);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  if (!schemaInfo) return <div>Loading model ${name}..</div>;
  return <ModelForm {...props} schemaInfo={schemaInfo} />;
}
