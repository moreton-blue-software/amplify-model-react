'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = useModelFormHandlers;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _set = require('lodash/fp/set');

var _set2 = _interopRequireDefault(_set);

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _notistack = require('notistack');

var _reactHooks = require('@apollo/react-hooks');

var _immutable = require('immutable');

var _ModelFormController = require('../ModelFormController');

var _Base = require('../common/graphql/Base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function getChildContextsById(parentId) {
  var _ModelFormGlobalProvi = _ModelFormController.ModelFormGlobalProvider.getGlobal(),
      formMap = _ModelFormGlobalProvi.formMap;

  return Object.values(formMap).filter(function (ctx) {
    var parentCtxId = (0, _get2.default)(ctx, 'parent.ctxId');
    return parentCtxId === parentId;
  });
}

function useModelFormHandlers(props) {
  var _this = this;

  var beforeSave = props.beforeSave,
      afterSave = props.afterSave,
      _formData = props.formData,
      _childContexts = props.childContexts,
      _query = props.query,
      refetch = props.refetch,
      ctxId = props.ctxId,
      _setFormData = props.setFormData,
      setChildrenMap = props.setChildrenMap,
      setFieldErrors = props.setFieldErrors,
      setState = props.setState,
      name = props.name,
      parentModelContext = props.parentModelContext,
      onSave = props.onSave;

  var _React$useState = _react2.default.useState((0, _immutable.List)([])),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      _beforeSaveHandlers = _React$useState2[0],
      setBeforeSaveHandlers = _React$useState2[1];

  var _React$useState3 = _react2.default.useState((0, _immutable.List)([])),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      _afterSaveHandlers = _React$useState4[0],
      setAfterSaveHandlers = _React$useState4[1];

  var _useSnackbar = (0, _notistack.useSnackbar)(),
      enqueueSnackbar = _useSnackbar.enqueueSnackbar;

  var apolloClient = (0, _reactHooks.useApolloClient)();
  var self = _react2.default.useRef({ formData: {} });

  _react2.default.useEffect(function () {
    self.current.formData = _formData;
  }, [_formData]);
  _react2.default.useEffect(function () {
    self.current.childContexts = _childContexts;
  }, [_childContexts]);
  _react2.default.useEffect(function () {
    self.current.query = _query;
  }, [_query]);
  _react2.default.useEffect(function () {
    self.current.beforeSaveHandlers = _beforeSaveHandlers;
  }, [_beforeSaveHandlers]);
  _react2.default.useEffect(function () {
    self.current.afterSaveHandlers = _afterSaveHandlers;
  }, [_afterSaveHandlers]);

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

  var _saveModel = _react2.default.useCallback(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var refetchQueries, savedParentId, noRefetch, _ref2, formData, childContexts, query, beforeSaveHandlers, afterSaveHandlers, formDataJson, _ModelFormGlobalProvi2, formMap, objFields, formDataClean, parentData, beforeSaveData, beforeSavePassed, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, beforeSaveObj, beforeSaveDataTmp, input, mutation, ret, savedId, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, afterSaveObj;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              refetchQueries = options.refetchQueries, savedParentId = options.savedParentId, noRefetch = options.noRefetch;
              _ref2 = self.current || {}, formData = _ref2.formData, childContexts = _ref2.childContexts, query = _ref2.query, beforeSaveHandlers = _ref2.beforeSaveHandlers, afterSaveHandlers = _ref2.afterSaveHandlers;
              formDataJson = formData;
              _ModelFormGlobalProvi2 = _ModelFormController.ModelFormGlobalProvider.getGlobal(), formMap = _ModelFormGlobalProvi2.formMap;
              // const thisForm = formMap[ctxId];

              objFields = (0, _get2.default)(query, 'definitions.0.selectionSet.selections.0.selectionSet.selections', []).filter(function (f) {
                return !f.selectionSet;
              }).map(function (f) {
                return (0, _get2.default)(f, 'name.value');
              });
              formDataClean = (0, _pick2.default)(formDataJson, [].concat(_toConsumableArray(objFields)));
              parentData = (0, _get2.default)(parentModelContext, 'data', {});
              // update parent data id from saved model

              if (savedParentId) {
                parentData.id = savedParentId;
              }
              beforeSaveData = {}, beforeSavePassed = true;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 12;
              _iterator = beforeSaveHandlers.sortBy(function (o) {
                return o.precedence;
              }).toJS()[Symbol.iterator]();

            case 14:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 23;
                break;
              }

              beforeSaveObj = _step.value;
              _context.next = 18;
              return _bluebird2.default.resolve(beforeSaveObj.fn({
                context: { data: formDataClean },
                parent: { data: parentData }
              }));

            case 18:
              beforeSaveDataTmp = _context.sent;

              if (beforeSaveDataTmp) {
                beforeSaveData = _extends({}, beforeSaveData, beforeSaveDataTmp);
              } else {
                beforeSavePassed = false;
              }

            case 20:
              _iteratorNormalCompletion = true;
              _context.next = 14;
              break;

            case 23:
              _context.next = 29;
              break;

            case 25:
              _context.prev = 25;
              _context.t0 = _context['catch'](12);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 29:
              _context.prev = 29;
              _context.prev = 30;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 32:
              _context.prev = 32;

              if (!_didIteratorError) {
                _context.next = 35;
                break;
              }

              throw _iteratorError;

            case 35:
              return _context.finish(32);

            case 36:
              return _context.finish(29);

            case 37:
              if (!(beforeSavePassed === false)) {
                _context.next = 39;
                break;
              }

              throw {
                ctxId: ctxId,
                dateId: (0, _get2.default)(formData, 'id'),
                parentCtxId: (0, _get2.default)(parentModelContext, 'ctxId'),
                parentDataId: (0, _get2.default)(parentData, 'id'),
                error: new Error('Before save validation failed. Please check form errors')
              };

            case 39:
              input = _extends({}, formDataClean, beforeSaveData);
              mutation = input.id ? (0, _Base.composeUpdateMutation)(name) : (0, _Base.composeCreateMutation)(name);
              _context.next = 43;
              return apolloClient.mutate({
                mutation: mutation,
                variables: {
                  input: input
                },
                refetchQueries: refetchQueries
              });

            case 43:
              ret = _context.sent;

              // const ret = { data: { model: { id: "hahaah" } } };

              savedId = (0, _get2.default)(ret, 'data.model.id');
              //save children models

              _context.next = 47;
              return _bluebird2.default.map(childContexts || [], function (childCtxKey) {
                var childCtx = formMap[childCtxKey];
                var isReadOnly = (0, _get2.default)(childCtx, 'state.readOnly');
                if (isReadOnly) return;
                return childCtx.handlers._saveModel({
                  savedParentId: savedId,
                  noRefetch: true
                });
              });

            case 47:
              formDataClean.id = savedId;

              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 51;
              _iterator2 = afterSaveHandlers.sortBy(function (o) {
                return o.precedence;
              }).toJS()[Symbol.iterator]();

            case 53:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 60;
                break;
              }

              afterSaveObj = _step2.value;
              _context.next = 57;
              return _bluebird2.default.resolve(afterSaveObj.fn({
                context: { data: formDataClean },
                parent: { data: parentData }
              }));

            case 57:
              _iteratorNormalCompletion2 = true;
              _context.next = 53;
              break;

            case 60:
              _context.next = 66;
              break;

            case 62:
              _context.prev = 62;
              _context.t1 = _context['catch'](51);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t1;

            case 66:
              _context.prev = 66;
              _context.prev = 67;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 69:
              _context.prev = 69;

              if (!_didIteratorError2) {
                _context.next = 72;
                break;
              }

              throw _iteratorError2;

            case 72:
              return _context.finish(69);

            case 73:
              return _context.finish(66);

            case 74:
              if (noRefetch) {
                _context.next = 77;
                break;
              }

              _context.next = 77;
              return refetch({
                modelId: savedId
              });

            case 77:
              return _context.abrupt('return', savedId);

            case 78:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[12, 25, 29, 37], [30,, 32, 36], [51, 62, 66, 74], [67,, 69, 73]]);
    }));

    return function () {
      return _ref.apply(this, arguments);
    };
  }(), [apolloClient, ctxId, name, parentModelContext, refetch]);

  var staticHandlers = _react2.default.useMemo(function () {
    return {
      attachBeforeSave: function attachBeforeSave(fn, precedence) {
        return setBeforeSaveHandlers(function (oldState) {
          return oldState.push({ fn: fn, precedence: precedence });
        });
      },
      detachBeforeSave: function detachBeforeSave(fn) {
        return setBeforeSaveHandlers(function (oldState) {
          var idx = oldState.findIndex(function (obj) {
            return obj.fn === fn;
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
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', _setFormData(formData));

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }))();
      },
      setFieldValue: function setFieldValue(fieldPath, value) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', _setFormData((0, _set2.default)(fieldPath, value)));

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this3);
        }))();
      }
    };
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  var handlers = _react2.default.useMemo(function () {
    return _extends({
      refetch: refetch,
      setChildrenMap: setChildrenMap,
      setFieldErrors: setFieldErrors,
      _saveModel: _saveModel
    }, staticHandlers, {
      getChildContexts: function getChildContexts() {
        return getChildContextsById(ctxId);
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
                  _context4.prev = 0;
                  _context4.next = 3;
                  return setState((0, _set2.default)('saving', true));

                case 3:
                  _context4.next = 5;
                  return _saveModel(options);

                case 5:
                  savedId = _context4.sent;
                  _context4.next = 8;
                  return setState((0, _set2.default)('saving', false));

                case 8:
                  onSave && onSave(savedId);
                  return _context4.abrupt('return', savedId);

                case 12:
                  _context4.prev = 12;
                  _context4.t0 = _context4['catch'](0);

                  if (!((0, _get2.default)(_context4.t0, 'parentCtxId') === ctxId)) {
                    _context4.next = 17;
                    break;
                  }

                  _context4.next = 17;
                  return _setFormData(function (oldState) {
                    return _extends({}, oldState, {
                      id: (0, _get2.default)(_context4.t0, 'parentDataId')
                    });
                  });

                case 17:
                  _context4.next = 19;
                  return setState((0, _set2.default)('saving', false));

                case 19:
                  enqueueSnackbar((0, _get2.default)(_context4.t0, 'error.message', 'Something went wrong!'), {
                    variant: 'error'
                  });
                  // eslint-disable-next-line no-console
                  console.error(_context4.t0);

                case 21:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this4, [[0, 12]]);
        }))();
      }
    });
  }, [_saveModel, ctxId, enqueueSnackbar, onSave, refetch, setChildrenMap, setFieldErrors, _setFormData, setState, staticHandlers]);

  handlers.getFieldValue = _react2.default.useCallback(function (fieldPath) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return _get2.default.apply(undefined, [_formData, fieldPath].concat(args));
  }, [_formData]);
  return handlers;
}