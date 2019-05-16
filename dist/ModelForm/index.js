"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelFormContext = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _templateObject = _taggedTemplateLiteral(["\n    query ", "{\n      model:get", "(id:\"", "\"){\n        ", "\n        ", "\n      }\n    }\n  "], ["\n    query ", "{\n      model:get", "(id:\"", "\"){\n        ", "\n        ", "\n      }\n    }\n  "]);

exports.default = function (props) {
  var name = props.name;

  var _React$useState17 = _react2.default.useState(),
      _React$useState18 = _slicedToArray(_React$useState17, 2),
      schemaInfo = _React$useState18[0],
      setSchemaInfo = _React$useState18[1];

  var _React$useContext2 = _react2.default.useContext(_ModelFormController2.default),
      schema = _React$useContext2.schema,
      getModelSchema = _React$useContext2.getModelSchema;

  _react2.default.useEffect(function () {
    var info = getModelSchema(name);
    setSchemaInfo(info);
  }, [schema, name]);

  if (!schemaInfo) return _react2.default.createElement(
    "div",
    null,
    "Loading model $",
    name,
    ".."
  );
  return _react2.default.createElement(ModelForm, _extends({}, props, { schemaInfo: schemaInfo }));
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Base = require("../common/graphql/Base");

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _immutable = require("immutable");

var _reactApolloHooks = require("react-apollo-hooks");

var _omit = require("lodash/omit");

var _omit2 = _interopRequireDefault(_omit);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _graphqlTag = require("graphql-tag");

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _nanoid = require("nanoid");

var _nanoid2 = _interopRequireDefault(_nanoid);

var _ModelFormController = require("../ModelFormController");

var _ModelFormController2 = _interopRequireDefault(_ModelFormController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var NOISE_FIELDS = ["__typename", "createdAt", "updatedAt", "videoFile"];

var objectTypes = void 0;

var ModelFormContext = exports.ModelFormContext = _react2.default.createContext();

var ModelForm = _react2.default.memo(function (props) {
  var name = props.name,
      modelIdTmp = props.modelId,
      onSave = props.onSave,
      defaultModelValue = props.defaultModelValue,
      beforeSave = props.beforeSave,
      afterSave = props.afterSave,
      _props$additionalFiel = props.additionalFields,
      additionalFields = _props$additionalFiel === undefined ? "" : _props$additionalFiel,
      schemaInfo = props.schemaInfo;

  var _React$useState = _react2.default.useState(name + "-" + (0, _nanoid2.default)()),
      _React$useState2 = _slicedToArray(_React$useState, 1),
      ctxId = _React$useState2[0];

  var _React$useState3 = _react2.default.useState((0, _immutable.Map)({})),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      state = _React$useState4[0],
      setState = _React$useState4[1];

  var _React$useState5 = _react2.default.useState((0, _immutable.Map)(defaultModelValue || {})),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      formData = _React$useState6[0],
      _setFormData = _React$useState6[1];

  var _React$useState7 = _react2.default.useState((0, _immutable.Map)({})),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      childrenMap = _React$useState8[0],
      setChildrenMap = _React$useState8[1];

  var _React$useState9 = _react2.default.useState([]),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      childContexts = _React$useState10[0],
      setChildContexts = _React$useState10[1];

  var _React$useState11 = _react2.default.useState((0, _immutable.List)([])),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      beforeSaveHandlers = _React$useState12[0],
      setBeforeSaveHandlers = _React$useState12[1];

  var _React$useState13 = _react2.default.useState((0, _immutable.List)([])),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      afterSaveHandlers = _React$useState14[0],
      setAfterSaveHandlers = _React$useState14[1];

  //attach before save


  _react2.default.useEffect(function () {
    var beforeSaveObj = { precedence: Infinity, fn: beforeSave }; //precedence Infinity = it will execute last
    // add
    beforeSave && setBeforeSaveHandlers(function (oldState) {
      return oldState.push(beforeSaveObj);
    });
    return function () {
      //remove
      beforeSave && setBeforeSaveHandlers(function (oldState) {
        var idx = oldState.findIndex(function (obj) {
          return obj === beforeSaveObj;
        });
        return oldState.delete(idx);
      });
    };
  }, [beforeSave]);

  //attach after save
  _react2.default.useEffect(function () {
    var afterSaveObj = { precedence: Infinity, fn: afterSave }; //precedence Infinity = it will execute last
    // add
    afterSave && setAfterSaveHandlers(function (oldState) {
      return oldState.push(afterSaveObj);
    });
    return function () {
      //remove
      afterSave && setAfterSaveHandlers(function (oldState) {
        var idx = oldState.findIndex(function (obj) {
          return obj === afterSaveObj;
        });
        return oldState.delete(idx);
      });
    };
  }, [afterSave]);

  var modelId = (0, _get2.default)(defaultModelValue, "id", modelIdTmp);
  var editMode = !!modelId;
  // const mutation = editMode
  //   ? composeUpdateMutation(name)
  //   : composeCreateMutation(name);

  var apolloClient = (0, _reactApolloHooks.useApolloClient)();
  // const saveMutation = useMutation(mutation);

  var parentModelContext = _react2.default.useContext(ModelFormContext);
  var hasParent = !!parentModelContext;

  var basicFieldsString = schemaInfo.basicFieldsString;

  if (!basicFieldsString) throw "Flat Field for \"" + name + "\" not found";

  var _React$useMemo = _react2.default.useMemo(function () {
    var queryKey = "GET_" + (0, _Base.toKey)(name);
    // console.log("queryKey", queryKey); //TRACE
    return {
      query: (0, _graphqlTag2.default)(_templateObject, queryKey, name, modelId, basicFieldsString, additionalFields),
      queryKey: queryKey
    };
  }, [name, modelId]),
      queryKey = _React$useMemo.queryKey,
      query = _React$useMemo.query;

  var _useQuery = (0, _reactApolloHooks.useQuery)(query, {
    notifyOnNetworkStatusChange: true,
    skip: !editMode // || (modelId && defaultModelValue),
  }),
      data = _useQuery.data,
      loading = _useQuery.loading;
  // console.log("formData.toJS()", formData.toJS()); //TRACE

  //Fetch model data for editting


  _react2.default.useEffect(function () {
    var modelData = (0, _get2.default)(data, "model", {});
    _setFormData(function (oldFormData) {
      return oldFormData.merge(modelData);
    });
  }, [data, editMode]);

  var handlers = _react2.default.useMemo(function () {
    return {
      setChildrenMap: setChildrenMap,
      attachBeforeSave: function attachBeforeSave(fn, precedence) {
        return setBeforeSaveHandlers(function (oldState) {
          return oldState.push({ fn: fn, precedence: precedence });
        });
      },
      detachBeforeSave: function detachBeforeSave(fn) {
        return setBeforeSaveHandlers(function (oldState) {
          var idx = oldState.findIndex(function (obj) {
            return obj === fn;
          });
          return oldState.delete(idx);
        });
      },
      attachAfterSave: function attachAfterSave(fn, precedence) {
        return setAfterSaveHandlers(function (oldState) {
          return oldState.push({ fn: fn, precedence: precedence });
        });
      },
      detachAfterSave: function detachAfterSave(fn) {
        return setAfterSaveHandlers(function (oldState) {
          var idx = oldState.findIndex(function (obj) {
            return obj === fn;
          });
          return oldState.delete(idx);
        });
      },
      setFormData: function setFormData(formData) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", _setFormData(function (oldFormData) {
                    return oldFormData.merge(formData);
                  }));

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }))();
      },
      setFieldValue: function setFieldValue(fieldPath, value) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt("return", _setFormData(function (oldFormData) {
                    return oldFormData.setIn(fieldPath.split("."), value);
                  }));

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }))();
      },
      getFieldValue: function getFieldValue(fieldPath) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return formData.getIn.apply(formData, [fieldPath.split(".")].concat(_toConsumableArray(args)));
      },
      _saveModel: function _saveModel() {
        var _this3 = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var refetchQueries, savedParentId, noRefetch, formDataJson, objFields, formDataClean, parentData, beforeSaveData, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, beforeSaveObj, beforeSaveDataTmp, input, mutation, ret, savedId, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, afterSaveObj;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  refetchQueries = options.refetchQueries, savedParentId = options.savedParentId, noRefetch = options.noRefetch;
                  formDataJson = formData.toJS();
                  objFields = (0, _get2.default)(query, "definitions.0.selectionSet.selections.0.selectionSet.selections", []).filter(function (f) {
                    return !!f.selectionSet;
                  }).map(function (f) {
                    return (0, _get2.default)(f, "name.value");
                  });
                  formDataClean = (0, _omit2.default)(formDataJson, [].concat(NOISE_FIELDS, _toConsumableArray(objFields)));
                  parentData = (0, _get2.default)(parentModelContext, "data", {});
                  // update parent data id from saved model

                  if (savedParentId) {
                    parentData.id = savedParentId;
                  }
                  beforeSaveData = {};
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context3.prev = 10;
                  _iterator = beforeSaveHandlers.sortBy(function (o) {
                    return o.precedence;
                  }).toJS()[Symbol.iterator]();

                case 12:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    _context3.next = 23;
                    break;
                  }

                  beforeSaveObj = _step.value;
                  _context3.next = 16;
                  return _bluebird2.default.resolve(beforeSaveObj.fn({
                    context: { data: formDataClean },
                    parent: { data: parentData }
                  }));

                case 16:
                  beforeSaveDataTmp = _context3.sent;

                  if (!(beforeSaveDataTmp === false)) {
                    _context3.next = 19;
                    break;
                  }

                  return _context3.abrupt("return");

                case 19:
                  beforeSaveData = _extends({}, beforeSaveData, beforeSaveDataTmp);

                case 20:
                  _iteratorNormalCompletion = true;
                  _context3.next = 12;
                  break;

                case 23:
                  _context3.next = 29;
                  break;

                case 25:
                  _context3.prev = 25;
                  _context3.t0 = _context3["catch"](10);
                  _didIteratorError = true;
                  _iteratorError = _context3.t0;

                case 29:
                  _context3.prev = 29;
                  _context3.prev = 30;

                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }

                case 32:
                  _context3.prev = 32;

                  if (!_didIteratorError) {
                    _context3.next = 35;
                    break;
                  }

                  throw _iteratorError;

                case 35:
                  return _context3.finish(32);

                case 36:
                  return _context3.finish(29);

                case 37:
                  input = _extends({}, formDataClean, beforeSaveData);
                  mutation = !!input.id ? (0, _Base.composeUpdateMutation)(name) : (0, _Base.composeCreateMutation)(name);
                  _context3.next = 41;
                  return apolloClient.mutate({
                    mutation: mutation,
                    variables: {
                      input: input
                    },
                    refetchQueries: refetchQueries
                  });

                case 41:
                  ret = _context3.sent;
                  savedId = (0, _get2.default)(ret, "data.model.id");
                  //save children models

                  _context3.next = 45;
                  return _bluebird2.default.map(childContexts || [], function (childCtx) {
                    return childCtx.handlers._saveModel({
                      savedParentId: savedId,
                      noRefetch: true
                    });
                  });

                case 45:
                  formDataClean.id = savedId;
                  // afterSave &&
                  //   (await afterSave({
                  //     context: { data: formDataClean },
                  //     parent: { data: parentData }
                  //   }));
                  _iteratorNormalCompletion2 = true;
                  _didIteratorError2 = false;
                  _iteratorError2 = undefined;
                  _context3.prev = 49;
                  _iterator2 = afterSaveHandlers.sortBy(function (o) {
                    return o.precedence;
                  }).toJS()[Symbol.iterator]();

                case 51:
                  if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                    _context3.next = 58;
                    break;
                  }

                  afterSaveObj = _step2.value;
                  _context3.next = 55;
                  return _bluebird2.default.resolve(afterSaveObj.fn({
                    context: { data: formDataClean },
                    parent: { data: parentData }
                  }));

                case 55:
                  _iteratorNormalCompletion2 = true;
                  _context3.next = 51;
                  break;

                case 58:
                  _context3.next = 64;
                  break;

                case 60:
                  _context3.prev = 60;
                  _context3.t1 = _context3["catch"](49);
                  _didIteratorError2 = true;
                  _iteratorError2 = _context3.t1;

                case 64:
                  _context3.prev = 64;
                  _context3.prev = 65;

                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                  }

                case 67:
                  _context3.prev = 67;

                  if (!_didIteratorError2) {
                    _context3.next = 70;
                    break;
                  }

                  throw _iteratorError2;

                case 70:
                  return _context3.finish(67);

                case 71:
                  return _context3.finish(64);

                case 72:
                  if (noRefetch) {
                    _context3.next = 75;
                    break;
                  }

                  _context3.next = 75;
                  return apolloClient.queryManager.refetchQueryByName(queryKey);

                case 75:
                  return _context3.abrupt("return", savedId);

                case 76:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, _this3, [[10, 25, 29, 37], [30,, 32, 36], [49, 60, 64, 72], [65,, 67, 71]]);
        }))();
      },
      save: function save() {
        var _this4 = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var savedId;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return setState(function (oldState) {
                    return oldState.merge({ saving: true });
                  });

                case 2:
                  _context4.next = 4;
                  return handlers._saveModel(options);

                case 4:
                  savedId = _context4.sent;
                  _context4.next = 7;
                  return setState(function (oldState) {
                    return oldState.merge({ saving: false });
                  });

                case 7:
                  onSave && onSave(savedId);
                  return _context4.abrupt("return", savedId);

                case 9:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, _this4);
        }))();
      }
    };
  }, [(0, _get2.default)(parentModelContext, "data"), formData, childContexts, beforeSaveHandlers, afterSave]);
  // console.log("childContexts", childContexts); //TRACE
  var formDataJS = _react2.default.useMemo(function () {
    return formData.toJS();
  }, [formData]);
  var stateJS = _react2.default.useMemo(function () {
    return _extends({}, state.toJS(), { loading: loading, editMode: editMode });
  }, [state, loading, editMode]);
  var childrenMapJS = _react2.default.useMemo(function () {
    return childrenMap.toJS();
  }, [childrenMap]);

  var contextState = _react2.default.useMemo(function () {
    return {
      ctxId: ctxId,
      name: name,
      data: formDataJS,
      state: stateJS,
      parent: parentModelContext,
      childrenMap: childrenMapJS,
      handlers: handlers
    };
  }, [formDataJS, stateJS, childrenMapJS, handlers]);

  //Add this context to parent context's children
  _react2.default.useEffect(function () {
    // console.log("parentModelContext", parentModelContext); //TRACE
    console.log("mf: mounted");

    parentModelContext && parentModelContext.handlers.setChildrenMap(function (oldMap) {
      return oldMap.set(ctxId, true);
    });
    // remove
    return function () {
      console.log("mf: unmounted");
      parentModelContext && parentModelContext.handlers.setChildrenMap(function (oldMap) {
        return oldMap.delete(ctxId);
      });
    };
  }, []);
  // console.log("contextState", contextState); //TRACE

  var handleChildContextChange = _react2.default.useCallback(function (ctxs) {
    setChildContexts(ctxs);
  }, []);

  var contextStateExtended = _react2.default.useMemo(function () {
    return _extends({}, contextState, { childContexts: childContexts || [] });
  }, [contextState, childContexts]);

  return _react2.default.createElement(
    ModelFormContext.Provider,
    { value: contextStateExtended },
    _react2.default.createElement(ControllerWatcher, {
      contextState: contextState,
      onChildContextsChange: handleChildContextChange
    }),
    hasParent ? props.children : _react2.default.createElement(
      "form",
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
      formMap = _React$useContext.formMap,
      setFormMap = _React$useContext.setFormMap;

  var _React$useState15 = _react2.default.useState((0, _immutable.Map)({ childContexts: null })),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      state = _React$useState16[0],
      setState = _React$useState16[1];

  //Add this context to controller map


  _react2.default.useEffect(function () {
    var _ref = contextState || {},
        parent = _ref.parent,
        ctxId = _ref.ctxId;

    if (parent) setFormMap(function (oldFormMap) {
      return oldFormMap.set(ctxId, contextState);
    });
    // remove
    return function () {
      setFormMap(function (oldFormMap) {
        return oldFormMap.delete(ctxId);
      });
    };
  }, [contextState]);
  var childrenMap = (0, _get2.default)(contextState, "childrenMap");
  // console.log("childrenMap", childrenMap); //TRACE
  var childrenCtxKeys = _react2.default.useMemo(function () {
    if (!childrenMap) return [];
    return Object.keys(childrenMap).sort();
  }, [childrenMap]);
  // console.log("childrenCtxKeys", childrenCtxKeys); //TRACE
  _react2.default.useEffect(function () {
    var childContexts = state.get("childContexts");
    var newChildContexts = [];
    childrenCtxKeys.forEach(function (k) {
      newChildContexts.push(formMap[k]);
    });

    if (newChildContexts.length === 0 && childContexts === null) return;

    setState(function (oldState) {
      return oldState.merge({ childContexts: newChildContexts });
    });
  }, [childrenCtxKeys, formMap]);

  _react2.default.useEffect(function () {
    onChildContextsChange && onChildContextsChange(state.get("childContexts"));
  }, [state.get("childContexts")]);

  return null;
}