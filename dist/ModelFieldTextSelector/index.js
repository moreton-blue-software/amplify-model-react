'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ModelFieldTextSelector;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModelForm = require('../ModelForm');

var _startCase = require('lodash/startCase');

var _startCase2 = _interopRequireDefault(_startCase);

var _Select = require('../Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ModelFieldTextSelector(props) {
  var disabled = props.disabled,
      label = props.label,
      placeholder = props.placeholder,
      field = props.field,
      options = props.options,
      _props$selectProps = props.selectProps,
      selectProps = _props$selectProps === undefined ? {} : _props$selectProps;

  var labelText = label || (0, _startCase2.default)(field);

  var _React$useContext = _react2.default.useContext(_ModelForm.ModelFormContext),
      handlers = _React$useContext.handlers;

  var handleChange = _react2.default.useCallback(function (item) {
    handlers.setFieldValue(field, item ? item.value : null);
  }, [field, handlers]);
  return _react2.default.createElement(
    'div',
    { style: { marginTop: 10 } },
    _react2.default.createElement(
      'label',
      null,
      labelText
    ),
    _react2.default.createElement(_Select2.default, _extends({
      isDisabled: disabled,
      value: handlers.getFieldValue(field),
      isClearable: true,
      onChange: handleChange,
      placeholder: placeholder ? placeholder : 'Select the ' + labelText,
      options: options
    }, selectProps))
  );
}