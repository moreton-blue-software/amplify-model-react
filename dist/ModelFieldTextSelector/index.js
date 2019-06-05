"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ModelFieldTextSelector;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ModelForm = require("../ModelForm");

var _startCase = require("lodash/startCase");

var _startCase2 = _interopRequireDefault(_startCase);

var _Select = require("../Select");

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ModelFieldTextSelector(props) {
  var disabled = props.disabled,
      label = props.label,
      placeholder = props.placeholder,
      field = props.field,
      options = props.options;

  var labelText = label || (0, _startCase2.default)(field);

  var _React$useContext = _react2.default.useContext(_ModelForm.ModelFormContext),
      handlers = _React$useContext.handlers;

  var handleChange = _react2.default.useCallback(function (item) {
    handlers.setFieldValue(field, item ? item.value : null);
  }, [handlers]);
  return _react2.default.createElement(
    "div",
    { style: { marginTop: 10 } },
    _react2.default.createElement(
      "label",
      null,
      labelText
    ),
    _react2.default.createElement(_Select2.default, {
      isDisabled: disabled,
      value: handlers.getFieldValue(field),
      isClearable: true,
      onChange: handleChange,
      placeholder: placeholder ? placeholder : "Select the " + labelText,
      options: options
    })
  );
}