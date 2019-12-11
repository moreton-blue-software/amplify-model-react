'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ModelFieldTextSelector;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _startCase = require('lodash/startCase');

var _startCase2 = _interopRequireDefault(_startCase);

var _Select = require('../Select');

var _Select2 = _interopRequireDefault(_Select);

var _ModelForm = require('../ModelForm');

var _core = require('@material-ui/core');

var _RequiredTag = require('./../common/RequiredTag');

var _RequiredTag2 = _interopRequireDefault(_RequiredTag);

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

  var _useModelForm = (0, _ModelForm.useModelForm)({ field: field }),
      form = _useModelForm.form,
      control = _useModelForm.control;

  var handlers = form.handlers;
  var errors = control.errors,
      hasErrors = control.hasErrors;


  var handleChange = _react2.default.useCallback(function (item) {
    handlers.setFieldValue(field, item ? item.value : null);
    control && control.setTouched(true);
  }, [field, handlers, control]);
  return _react2.default.createElement(
    'div',
    { style: { marginTop: 10 } },
    _react2.default.createElement(
      'label',
      null,
      labelText,
      _react2.default.createElement(_RequiredTag2.default, null)
    ),
    _react2.default.createElement(_Select2.default, _extends({
      isDisabled: disabled,
      value: handlers.getFieldValue(field),
      isClearable: true,
      onChange: handleChange,
      placeholder: placeholder ? placeholder : 'Select the ' + labelText,
      options: options
    }, selectProps)),
    hasErrors && _react2.default.createElement(
      _core.FormHelperText,
      { style: { color: 'red' } },
      errors.map(function (error) {
        return error;
      })
    )
  );
}