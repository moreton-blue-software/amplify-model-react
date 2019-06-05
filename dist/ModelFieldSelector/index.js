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

  var _React$useContext = _react2.default.useContext(_ModelForm.ModelFormContext),
      handlers = _React$useContext.handlers;

  var handleChange = _react2.default.useCallback(function (item) {
    handlers.setFieldValue(field, item ? item.id : null);
  }, [handlers]);
  return _react2.default.createElement(_ModelSelector2.default, {
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
  });
}