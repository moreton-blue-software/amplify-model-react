import React from 'react';
import set from 'lodash/fp/set';
import pick from 'lodash/pick';
import get from 'lodash/get';
import Promise from 'bluebird';
import { useSnackbar } from 'notistack';
import { useApolloClient } from '@apollo/react-hooks';
import { List } from 'immutable';
import { ModelFormGlobalProvider } from '../ModelFormController';
import { composeCreateMutation, composeUpdateMutation } from '../common/graphql/Base';

function getChildContextsById(parentId) {
  const { formMap } = ModelFormGlobalProvider.getGlobal();
  return Object.values(formMap).filter(ctx => {
    const parentCtxId = get(ctx, 'parent.ctxId');
    return parentCtxId === parentId;
  });
}

export default function useModelFormHandlers(props) {
  const {
    beforeSave,
    afterSave,
    formData: _formData,
    childContexts: _childContexts,
    query: _query,
    refetch,
    ctxId,
    setFormData,
    setChildrenMap,
    setFieldErrors,
    setState,
    name,
    parentModelContext,
    onSave,
    resetFormData
  } = props;
  const [_beforeSaveHandlers, setBeforeSaveHandlers] = React.useState(List([]));
  const [_afterSaveHandlers, setAfterSaveHandlers] = React.useState(List([]));
  const {
    enqueueSnackbar
    // , closeSnackbar
  } = useSnackbar();
  const apolloClient = useApolloClient();
  const self = React.useRef({ formData: {} });

  React.useEffect(() => {
    self.current.formData = _formData;
  }, [_formData]);
  React.useEffect(() => {
    self.current.childContexts = _childContexts;
  }, [_childContexts]);
  React.useEffect(() => {
    self.current.query = _query;
  }, [_query]);
  React.useEffect(() => {
    self.current.beforeSaveHandlers = _beforeSaveHandlers;
  }, [_beforeSaveHandlers]);
  React.useEffect(() => {
    self.current.afterSaveHandlers = _afterSaveHandlers;
  }, [_afterSaveHandlers]);

  //attach before save
  React.useEffect(() => {
    const beforeSaveObj = { precedence: Infinity, fn: beforeSave }; //precedence Infinity = it will execute last
    // add
    beforeSave && setBeforeSaveHandlers(oldState => oldState.push(beforeSaveObj));
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

  const _saveModel = React.useCallback(
    async (options = {}) => {
      const { refetchQueries, savedParentId, noRefetch } = options;
      const { formData, childContexts, query, beforeSaveHandlers, afterSaveHandlers } =
        self.current || {};
      const formDataJson = formData;

      const { formMap } = ModelFormGlobalProvider.getGlobal();
      // const thisForm = formMap[ctxId];

      const objFields = get(
        query,
        'definitions.0.selectionSet.selections.0.selectionSet.selections',
        []
      )
        .filter(f => {
          return !f.selectionSet;
        })
        .map(f => get(f, 'name.value'));

      const formDataClean = pick(formDataJson, [...objFields]);

      const parentData = get(parentModelContext, 'data', {});
      // update parent data id from saved model
      if (savedParentId) {
        parentData.id = savedParentId;
      }
      let beforeSaveData = {},
        beforeSavePassed = true;
      for (const beforeSaveObj of beforeSaveHandlers.sortBy(o => o.precedence).toJS()) {
        const beforeSaveDataTmp = await Promise.resolve(
          beforeSaveObj.fn({
            context: { data: formDataClean },
            parent: { data: parentData }
          })
        );
        if (beforeSaveDataTmp) {
          beforeSaveData = { ...beforeSaveData, ...beforeSaveDataTmp };
        } else {
          beforeSavePassed = false;
        }
      }
      if (beforeSavePassed === false) {
        throw {
          ctxId,
          dateId: get(formData, 'id'),
          parentCtxId: get(parentModelContext, 'ctxId'),
          parentDataId: get(parentData, 'id'),
          error: new Error('Before save validation failed. Please check form errors')
        };
      }

      const input = { ...formDataClean, ...beforeSaveData };
      const mutation = input.id
        ? composeUpdateMutation(name)
        : composeCreateMutation(name);
      const ret = await apolloClient.mutate({
        mutation,
        variables: {
          input
        },
        refetchQueries
      });
      // const ret = { data: { model: { id: "hahaah" } } };

      const savedId = get(ret, 'data.model.id');
      //save children models
      await Promise.map(childContexts || [], childCtxKey => {
        const childCtx = formMap[childCtxKey];
        const isReadOnly = get(childCtx, 'state.readOnly');
        if (isReadOnly) return;
        return childCtx.handlers._saveModel({
          savedParentId: savedId,
          noRefetch: true
        });
      });
      formDataClean.id = savedId;

      for (const afterSaveObj of afterSaveHandlers.sortBy(o => o.precedence).toJS()) {
        await Promise.resolve(
          afterSaveObj.fn({
            context: { data: formDataClean },
            parent: { data: parentData }
          })
        );
      }

      if (!noRefetch)
        await refetch({
          modelId: savedId
        });
      // await apolloClient.queryManager.ref.refetchQueryByName(queryKey);

      // console.log("ret", ret); //TRACE
      return savedId;
    },
    [apolloClient, ctxId, name, parentModelContext, refetch]
  );

  const staticHandlers = React.useMemo(
    () => ({
      attachBeforeSave(fn, precedence) {
        return setBeforeSaveHandlers(oldState => oldState.push({ fn, precedence }));
      },
      detachBeforeSave(fn) {
        return setBeforeSaveHandlers(oldState => {
          const idx = oldState.findIndex(obj => obj.fn === fn);
          return oldState.delete(idx);
        });
      },
      attachAfterSave(fn, precedence) {
        return setAfterSaveHandlers(oldState => oldState.push({ fn, precedence }));
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
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handlers = React.useMemo(
    () => ({
      refetch,
      setChildrenMap,
      setFieldErrors,
      _saveModel,
      resetFormData,
      ...staticHandlers,
      getChildContexts() {
        return getChildContextsById(ctxId);
      },
      async save(options = {}) {
        try {
          await setState(set('saving', true));
          const savedId = await _saveModel(options);
          await setState(set('saving', false));
          onSave && onSave(savedId);
          return savedId;
        } catch (err) {
          if (get(err, 'parentCtxId') === ctxId) {
            await setFormData(oldState => ({
              ...oldState,
              id: get(err, 'parentDataId')
            }));
          }
          await setState(set('saving', false));
          enqueueSnackbar(get(err, 'error.message', 'Something went wrong!'), {
            variant: 'error'
          });
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }
    }),
    [
      _saveModel,
      ctxId,
      enqueueSnackbar,
      onSave,
      refetch,
      setChildrenMap,
      setFieldErrors,
      setFormData,
      setState,
      staticHandlers
    ]
  );

  handlers.getFieldValue = React.useCallback(
    (fieldPath, ...args) => {
      return get(_formData, fieldPath, ...args);
    },
    [_formData]
  );
  return handlers;
}
