"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _templateObject = _taggedTemplateLiteral(["\n    query ", " ($limit: Int, $filter: Model", "FilterInput, $nextToken: String){\n      list:list", "s(limit: $limit, filter: $filter, nextToken: $nextToken){\n        nextToken\n        items{\n        ", "\n        }\n      }\n    }\n  "], ["\n    query ", " ($limit: Int, $filter: Model", "FilterInput, $nextToken: String){\n      list:list", "s(limit: $limit, filter: $filter, nextToken: $nextToken){\n        nextToken\n        items{\n        ", "\n        }\n      }\n    }\n  "]),
    _templateObject2 = _taggedTemplateLiteral(["\n          {\n            value: get", "(id:\"", "\"){\n              ", "\n            }\n          }\n        "], ["\n          {\n            value: get", "(id:\"", "\"){\n              ", "\n            }\n          }\n        "]);

exports.default = ModelSelector;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Select = require("../Select");

var _Select2 = _interopRequireDefault(_Select);

var _reactApolloHooks = require("react-apollo-hooks");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _graphqlTag = require("graphql-tag");

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _upperCase = require("lodash/upperCase");

var _upperCase2 = _interopRequireDefault(_upperCase);

var _startCase = require("lodash/startCase");

var _startCase2 = _interopRequireDefault(_startCase);

var _immutable = require("immutable");

var _ModelFormController = require("../ModelFormController");

var _ModelFormController2 = _interopRequireDefault(_ModelFormController);

var _merge = require("lodash/fp/merge");

var _merge2 = _interopRequireDefault(_merge);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ModelSelector(props) {
  var _this = this;

  var name = props.name,
      onChange = props.onChange,
      readOnly = props.readOnly,
      onLabelClick = props.onLabelClick,
      disabled = props.disabled,
      renderLabel = props.renderLabel,
      value = props.value,
      label = props.label,
      placeholder = props.placeholder,
      _props$queryOpts = props.queryOpts,
      queryOptions = _props$queryOpts === undefined ? {} : _props$queryOpts,
      sorter = props.sorter,
      filter = props.filter;

  var labelText = label || (0, _startCase2.default)(props.name);

  var _React$useState = _react2.default.useState({
    options: [],
    selectedModelValue: null
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  var _React$useContext = _react2.default.useContext(_ModelFormController2.default),
      getModelSchema = _React$useContext.getModelSchema;

  var dataFilter = queryOptions.dataFilter,
      _queryOptions$limit = queryOptions.limit,
      limit = _queryOptions$limit === undefined ? 150 : _queryOptions$limit,
      queryOpts = _objectWithoutProperties(queryOptions, ["dataFilter", "limit"]);

  var modelSchema = getModelSchema(name);
  var modelFlatFields = modelSchema.basicFieldsString;
  if (!modelFlatFields) throw "Flat Field for \"" + name + "\" not found";

  var _React$useMemo = _react2.default.useMemo(function () {
    var queryKey = "LIST_" + (0, _upperCase2.default)("" + name).replace(/ /g, "_");
    return {
      query: (0, _graphqlTag2.default)(_templateObject, queryKey, name, name, modelFlatFields),
      queryKey: queryKey
    };
  }, [name]),
      queryKey = _React$useMemo.queryKey,
      query = _React$useMemo.query;

  //convert to fragment


  var apolloClient = (0, _reactApolloHooks.useApolloClient)();
  _react2.default.useEffect(function () {
    var um = false;
    _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var valueModel;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(">>ModelSelector/index::", "value", value); //TRACE

              if (!(!value || state.selectedModelValue)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              _context.next = 5;
              return apolloClient.query({
                query: (0, _graphqlTag2.default)(_templateObject2, name, value, modelFlatFields)
              });

            case 5:
              valueModel = _context.sent;

              setState(function (oldState) {
                return _extends({}, oldState, {
                  selectedModelValue: (0, _get2.default)(valueModel, "data.value")
                });
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
    return function () {
      return um = true;
    };
  }, [name, value]);

  var sorterFn = _react2.default.useMemo(function () {
    if (sorter) return sorter;
    return function () {};
  }, [sorter]);

  var filterFn = _react2.default.useMemo(function () {
    if (filter) return filter;
    return function () {
      return true;
    };
  }, [filter]);

  var _useQuery = (0, _reactApolloHooks.useQuery)(query, (0, _merge2.default)({
    variables: { limit: limit, filter: dataFilter },
    notifyOnNetworkStatusChange: true
  })(queryOpts)),
      data = _useQuery.data,
      fetchMore = _useQuery.fetchMore,
      networkStatus = _useQuery.networkStatus;

  var loading = networkStatus !== 7;

  function asOption(modelItem) {
    var label = renderLabel ? renderLabel(modelItem) : modelItem.id;
    return {
      label: label,
      value: modelItem
    };
  }

  _react2.default.useEffect(function () {
    var nextToken = (0, _get2.default)(data, "list.nextToken");
    if (nextToken) {
      _bluebird2.default.delay(200).then(function () {
        fetchMore({
          variables: {
            nextToken: nextToken
          },
          updateQuery: function updateQuery(prev, _ref2) {
            var fetchMoreResult = _ref2.fetchMoreResult;

            if (!fetchMoreResult) return prev;
            var newNextToken = (0, _get2.default)(fetchMoreResult, "list.nextToken");
            var newList = (0, _get2.default)(fetchMoreResult, "list.items", []);
            var oldList = (0, _get2.default)(prev, "list.items", []);
            var newData = _extends({}, prev, {
              list: _extends({}, prev.list, {
                nextToken: newNextToken,
                items: [].concat(_toConsumableArray(oldList), _toConsumableArray(newList))
              })
            });
            return newData;
          }
        });
      });
    }
  }, [data]);

  var handleModelInputChange = _react2.default.useCallback(function (e) {
    onChange && onChange(e ? e.value : null);
  }, [onChange]);

  var theOpts = _react2.default.useMemo(function () {
    var tmp = [];
    var selectedModelValue = state.selectedModelValue;

    var selectedHasAdded = !selectedModelValue;
    (0, _get2.default)(data, "list.items", []).forEach(function (modelItem) {
      tmp.push(asOption(modelItem));
      if (!selectedHasAdded) {
        selectedHasAdded = (0, _get2.default)(modelItem, "id") === (0, _get2.default)(selectedModelValue, "id");
      }
    });

    if (!selectedHasAdded && selectedModelValue) {
      tmp.push(asOption(selectedModelValue));
    }

    return tmp.filter(filterFn).sort(sorterFn);
  }, [state.selectedModelValue, sorterFn, filterFn, data]);

  var ph = "Loading...";
  if (!loading) {
    ph = placeholder ? placeholder : "Select " + (0, _startCase2.default)(name);
  }

  var readOnlyLabel = _react2.default.useMemo(function () {
    if (!readOnly) return;
    if (!state.selectedModelValue) return "...";
    var readOnlyValue = asOption(state.selectedModelValue);
    return _react2.default.createElement(
      "a",
      {
        href: "#",
        style: { textDecoration: "none" },
        onClick: function onClick(e) {
          e.preventDefault();
          onLabelClick && onLabelClick(e);
        }
      },
      readOnlyValue.label
    );
  }, [readOnly, onLabelClick, state.selectedModelValue]);

  return _react2.default.createElement(
    "div",
    { style: { marginTop: 10 } },
    _react2.default.createElement(
      "label",
      null,
      labelText
    ),
    readOnly ? _react2.default.createElement(
      _Typography2.default,
      null,
      readOnlyLabel
    ) : _react2.default.createElement(_Select2.default, {
      value: value,
      disabled: disabled,
      optionKey: "value.id",
      cacheOptions: true,
      isLoading: loading,
      options: theOpts,
      isClearable: true,
      placeholder: ph,
      defaultOptions: true
      // onSelectedModelChange={handleSelectedModelChange}
      , onChange: handleModelInputChange
    })
  );
}