"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Select;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require("react-select");

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _keyBy = require("lodash/keyBy");

var _keyBy2 = _interopRequireDefault(_keyBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Select(props) {
  var rawValue = props.value,
      _props$optionKey = props.optionKey,
      optionKey = _props$optionKey === undefined ? "value" : _props$optionKey,
      onSelectedModelChange = props.onSelectedModelChange,
      disabled = props.disabled,
      rest = _objectWithoutProperties(props, ["value", "optionKey", "onSelectedModelChange", "disabled"]);

  var _React$useState = _react2.default.useState({ optMap: [] }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  var optMap = state.optMap;


  _react2.default.useEffect(function () {
    setState(function (oldState) {
      return _extends({}, oldState, {
        optMap: (0, _keyBy2.default)(rest.options, optionKey)
      });
    });
  }, [rest.options]);

  var value = _react2.default.useMemo(function () {
    return optMap[rawValue];
  }, [rawValue, optMap]);

  _react2.default.useEffect(function () {
    onSelectedModelChange && onSelectedModelChange(value);
  }, [value]);

  return _react2.default.createElement(_reactSelect2.default, _extends({}, rest, { isDisabled: disabled, value: value }));
}