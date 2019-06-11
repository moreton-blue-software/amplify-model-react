"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ModelFieldSelector;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ModelSelector = require("../ModelSelector");

var _ModelSelector2 = _interopRequireDefault(_ModelSelector);

var _ModelForm = require("../ModelForm");

var _FormHelperText = require("@material-ui/core/FormHelperText");

var _FormHelperText2 = _interopRequireDefault(_FormHelperText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ModelFieldSelector(props) {
  var name = props.name,
      readOnly = props.readOnly,
      onLabelClick = props.onLabelClick,
      disabled = props.disabled,
      renderLabel = props.renderLabel,
      label = props.label,
      field = props.field,
      placeholder = props.placeholder,
      queryOpts = props.queryOpts,
      sorter = props.sorter,
      filter = props.filter;

  var _useModelForm = (0, _ModelForm.useModelForm)({ field: field }),
      form = _useModelForm.form,
      control = _useModelForm.control;

  var handlers = form.handlers;
  var errors = control.errors,
      hasErrors = control.hasErrors;


  var handleChange = _react2.default.useCallback(function (item) {
    handlers.setFieldValue(field, item ? item.id : null);
    control && control.setTouched(true);
  }, [handlers]);
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(_ModelSelector2.default, {
      name: name,
      readOnly: readOnly,
      onLabelClick: onLabelClick,
      disabled: disabled,
      renderLabel: renderLabel,
      value: handlers.getFieldValue(field),
      onChange: handleChange,
      label: label,
      placeholder: placeholder,
      queryOpts: queryOpts,
      sorter: sorter,
      filter: filter
    }),
    hasErrors && _react2.default.createElement(
      _FormHelperText2.default,
      { style: { color: "red" } },
      errors.map(function (error) {
        return error;
      })
    )
  );
}