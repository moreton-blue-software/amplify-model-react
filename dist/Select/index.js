'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Select;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _keyBy = require('lodash/keyBy');

var _keyBy2 = _interopRequireDefault(_keyBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Select(props) {
  var rawValue = props.value,
      _props$optionKey = props.optionKey,
      optionKey = _props$optionKey === undefined ? 'value' : _props$optionKey,
      disabled = props.disabled,
      rest = _objectWithoutProperties(props, ['value', 'optionKey', 'disabled']);

  var optMap = _react2.default.useMemo(function () {
    return (0, _keyBy2.default)(rest.options, optionKey);
  }, [rest.options]);
  var value = _react2.default.useMemo(function () {
    return optMap[rawValue];
  }, [rawValue, optMap]);
  return _react2.default.createElement(_reactSelect2.default, _extends({}, rest, { isDisabled: disabled, value: value }));
}