'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelFormContext = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\n    query ', ' ($modelId: ID!){\n      model:get', '(id:$modelId){\n        ', '\n        ', '\n      }\n    }\n  '], ['\n    query ', ' ($modelId: ID!){\n      model:get', '(id:$modelId){\n        ', '\n        ', '\n      }\n    }\n  ']);

exports.useModelForm = useModelForm;

exports.default = function (props) {
  var name = props.name;

  var _React$useState13 = _react2.default.useState(),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      schemaInfo = _React$useState14[0],
      setSchemaInfo = _React$useState14[1];

  var _React$useContext2 = _react2.default.useContext(_ModelFormController2.default),
      getModelSchema = _React$useContext2.getModelSchema;

  _react2.default.useEffect(function () {
    var info = getModelSchema(name);
    setSchemaInfo(info);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  if (!schemaInfo) return _react2.default.createElement(
    'div',
    null,
    'Loading model $',
    name,
    '..'
  );
  return _react2.default.createElement(ModelForm, _extends({}, props, { schemaInfo: schemaInfo }));
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Base = require('../common/graphql/Base');

var _reactHooks = require('@apollo/react-hooks');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _nanoid = require('nanoid');

var _nanoid2 = _interopRequireDefault(_nanoid);

var _ModelFormController = require('../ModelFormController');

var _ModelFormController2 = _interopRequireDefault(_ModelFormController);

var _set = require('lodash/fp/set');

var _set2 = _interopRequireDefault(_set);

var _omit = require('lodash/fp/omit');

var _omit2 = _interopRequireDefault(_omit);

var _ModelControl = require('./../ModelControl');

var _handlers = require('./handlers');

var _handlers2 = _interopRequireDefault(_handlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/// const NOISE_FIELDS = ["__typename", "createdAt", "updatedAt", "videoFile"];

var ModelFormContext = exports.ModelFormContext = _react2.default.createContext();

function useModelForm() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      field = _ref.field;

  var form = _react2.default.useContext(ModelFormContext);
  var control = _react2.default.useContext(_ModelControl.ModelControlContext);
  _react2.default.useEffect(function () {
    if (control && field) {
      control.setFields(function (oldFields) {
        return _extends({}, oldFields, _defineProperty({}, field, true));
      });
    }
  }, [control, field]);
  return {
    form: form,
    control: control || {
      setTouched: function setTouched() {}
    }
  };
}

var ModelForm = _react2.default.memo(function (props) {
  var name = props.name,
      modelIdTmp = props.modelId,
      onSave = props.onSave,
      onChange = props.onChange,
      defaultModelValue = props.defaultModelValue,
      beforeSave = props.beforeSave,
      afterSave = props.afterSave,
      _props$additionalFiel = props.additionalFields,
      additionalFields = _props$additionalFiel === undefined ? '' : _props$additionalFiel,
      schemaInfo = props.schemaInfo,
      readOnly = props.readOnly,
      fetchPolicy = props.fetchPolicy;

  var _React$useState = _react2.default.useState(name + '-' + (0, _nanoid2.default)()),
      _React$useState2 = _slicedToArray(_React$useState, 1),
      ctxId = _React$useState2[0];

  var _React$useState3 = _react2.default.useState({}),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      state = _React$useState4[0],
      setState = _React$useState4[1];

  var _React$useState5 = _react2.default.useState({}),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      fieldErrors = _React$useState6[0],
      setFieldErrors = _React$useState6[1];

  var _React$useState7 = _react2.default.useState(defaultModelValue || {}),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      formData = _React$useState8[0],
      setFormData = _React$useState8[1];

  var _React$useState9 = _react2.default.useState({}),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      childrenMap = _React$useState10[0],
      setChildrenMap = _React$useState10[1];

  var _React$useState11 = _react2.default.useState([]),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      childContexts = _React$useState12[0],
      setChildContexts = _React$useState12[1];

  _react2.default.useEffect(function () {
    onChange && onChange(formData);
  }, [formData, onChange]);

  var modelId = (0, _get2.default)(defaultModelValue, 'id', modelIdTmp);

  var parentModelContext = _react2.default.useContext(ModelFormContext);
  var hasParent = !!parentModelContext;

  var basicFieldsString = schemaInfo.basicFieldsString;

  if (!basicFieldsString) throw 'Flat Field for "' + name + '" not found';

  var _React$useMemo = _react2.default.useMemo(function () {
    var queryKey = 'GET_' + (0, _Base.toKey)(name);
    // console.log("queryKey", queryKey); //TRACE
    return {
      query: (0, _graphqlTag2.default)(_templateObject, queryKey, name, basicFieldsString, additionalFields),
      queryKey: queryKey
    };
  }, [additionalFields, basicFieldsString, name]),
      query = _React$useMemo.query;

  var _useQuery = (0, _reactHooks.useQuery)(query, {
    skip: !modelId,
    variables: {
      modelId: modelId
    },
    fetchPolicy: fetchPolicy
  }),
      data = _useQuery.data,
      loading = _useQuery.loading,
      refetch = _useQuery.refetch;

  //Fetch model data for editting


  _react2.default.useEffect(function () {
    var modelData = (0, _get2.default)(data, 'model', {});
    setFormData(function (oldModelData) {
      return _extends({}, oldModelData, modelData);
    });
  }, [data]);

  var editMode = !!(0, _get2.default)(formData, 'id');

  var handlers = (0, _handlers2.default)({
    beforeSave: beforeSave,
    afterSave: afterSave,
    refetch: refetch,
    ctxId: ctxId,
    formData: formData,
    query: query,
    setChildrenMap: setChildrenMap,
    setFieldErrors: setFieldErrors,
    setFormData: setFormData,
    setState: setState,
    parentModelContext: parentModelContext,
    name: name,
    childContexts: childContexts,
    onSave: onSave
  });

  // console.log("childContexts", childContexts); //TRACE
  var stateJS = _react2.default.useMemo(function () {
    var errors = [];
    Object.entries(fieldErrors).forEach(function (entry) {
      var _entry = _slicedToArray(entry, 2),
          fieldName = _entry[0],
          errorList = _entry[1];

      if (errorList && errorList.length > 0) {
        errorList.forEach(function (err) {
          errors.push({ fieldName: fieldName, err: err });
        });
      }
    });
    return _extends({}, state, {
      errors: errors,
      hasErrors: errors.length > 0,
      loading: loading,
      editMode: editMode,
      readOnly: readOnly
    });
  }, [state, loading, editMode, fieldErrors, readOnly]);

  var contextState = _react2.default.useMemo(function () {
    return {
      ctxId: ctxId,
      name: name,
      data: formData,
      state: stateJS,
      parent: parentModelContext,
      childrenMap: childrenMap,
      handlers: handlers,
      readOnly: readOnly
    };
  }, [ctxId, name, formData, stateJS, parentModelContext, childrenMap, handlers, readOnly]);

  //Add this context to parent context's children
  _react2.default.useEffect(function () {
    // console.log("parentModelContext", parentModelContext); //TRACE
    parentModelContext && parentModelContext.handlers.setChildrenMap((0, _set2.default)(ctxId, true));
    // remove
    return function () {
      console.log('>>ModelForm/index::', 'unmounted', ctxId); //TRACE
      parentModelContext && parentModelContext.handlers.setChildrenMap((0, _omit2.default)([ctxId]));
    };
  }, []);
  // console.log("contextState", contextState); //TRACE

  var handleChildContextChange = _react2.default.useCallback(function (ctxs) {
    setChildContexts(ctxs);
  }, []);

  return _react2.default.createElement(
    ModelFormContext.Provider,
    { value: contextState },
    _react2.default.createElement(ControllerWatcher, {
      contextState: contextState,
      onChildContextsChange: handleChildContextChange
    }),
    hasParent ? props.children : _react2.default.createElement(
      'form',
      null,
      props.children
    )
  );
});

// function BeforeSaveHandlersWatcher(props) {
//   const [state, setState] = React.useState(Map({}));
// }

function ControllerWatcher(props) {
  var contextState = props.contextState,
      onChildContextsChange = props.onChildContextsChange;

  var _React$useContext = _react2.default.useContext(_ModelFormController2.default),
      setFormMap = _React$useContext.setFormMap,
      getFormMap = _React$useContext.getFormMap;
  //Add this context to controller map


  _react2.default.useEffect(function () {
    var _ref2 = contextState || {},
        parent = _ref2.parent,
        ctxId = _ref2.ctxId;

    if (parent) setFormMap(_defineProperty({}, ctxId, contextState));
    // remove
    return function () {
      setFormMap((0, _omit2.default)([ctxId])(getFormMap()));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextState]);

  var childrenMap = (0, _get2.default)(contextState, 'childrenMap');

  _react2.default.useEffect(function () {
    var keys = Object.keys(childrenMap || []).sort();
    onChildContextsChange && onChildContextsChange(keys || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenMap]);

  return null;
}

// eslint-disable-next-line react/no-multi-comp