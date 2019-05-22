"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(["\n    query ", " ($limit: Int, $filter: Model", "FilterInput){\n      list:list", "s(limit: $limit, filter: $filter){\n        nextToken\n        items{\n        ", "\n        }\n      }\n    }\n  "], ["\n    query ", " ($limit: Int, $filter: Model", "FilterInput){\n      list:list", "s(limit: $limit, filter: $filter){\n        nextToken\n        items{\n        ", "\n        }\n      }\n    }\n  "]);

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

var _upperCase = require("lodash/upperCase");

var _upperCase2 = _interopRequireDefault(_upperCase);

var _startCase = require("lodash/startCase");

var _startCase2 = _interopRequireDefault(_startCase);

var _immutable = require("immutable");

var _ModelFormController = require("../ModelFormController");

var _ModelFormController2 = _interopRequireDefault(_ModelFormController);

var _merge = require("lodash/fp/merge");

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ModelSelector(props) {
  var name = props.name,
      onChange = props.onChange,
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

  var _React$useContext = _react2.default.useContext(_ModelFormController2.default),
      getModelSchema = _React$useContext.getModelSchema;

  var dataFilter = queryOptions.dataFilter,
      _queryOptions$limit = queryOptions.limit,
      limit = _queryOptions$limit === undefined ? 100 : _queryOptions$limit,
      queryOpts = _objectWithoutProperties(queryOptions, ["dataFilter", "limit"]);

  var modelSchema = getModelSchema(name);
  var modelFlatFields = modelSchema.basicFieldsString;
  if (!modelFlatFields) throw "Flat Field for \"" + name + "\" not found";

  var _React$useMemo = _react2.default.useMemo(function () {
    var queryKey = "LIST_" + (0, _upperCase2.default)("" + name);
    console.log("queryKey", queryKey); //TRACE
    return {
      query: (0, _graphqlTag2.default)(_templateObject, queryKey, name, name, modelFlatFields),
      queryKey: queryKey
    };
  }, [name]),
      queryKey = _React$useMemo.queryKey,
      query = _React$useMemo.query;

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

  var _useQuery = (0, _reactApolloHooks.useQuery)(query, (0, _merge2.default)({ variables: { limit: limit, filter: dataFilter } })(queryOpts)),
      data = _useQuery.data,
      loading = _useQuery.loading;

  var _React$useMemo2 = _react2.default.useMemo(function () {
    var options = [];
    (0, _get2.default)(data, "list.items", []).forEach(function (modelItem) {
      var label = renderLabel ? renderLabel(modelItem) : modelItem.id;
      var item = {
        label: label,
        value: modelItem
      };
      options.push(item);
    });
    return { options: options.filter(filterFn).sort(sorterFn) };
  }, [data, sorterFn, filterFn]),
      options = _React$useMemo2.options;

  var handleModelInputChange = _react2.default.useCallback(function (e) {
    onChange && onChange(e.value);
  }, [onChange]);

  return _react2.default.createElement(
    "div",
    { style: { marginTop: 10 } },
    _react2.default.createElement(
      "label",
      null,
      labelText
    ),
    _react2.default.createElement(_Select2.default, {
      value: value,
      disabled: disabled,
      optionKey: "value.id",
      cacheOptions: true,
      isLoading: loading,
      options: options,
      placeholder: placeholder ? placeholder : "Select " + (0, _startCase2.default)(name),
      defaultOptions: true,
      onChange: handleModelInputChange
    })
  );
}