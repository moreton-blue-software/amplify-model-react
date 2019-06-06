"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requiredTagText = requiredTagText;
exports.default = RequiredTag;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ModelControl = require("../ModelControl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function requiredTagText() {
  return "(required)";
}

function RequiredTag() {
  var ctx = _react2.default.useContext(_ModelControl.ModelControlContext);
  var required = ctx && ctx.required;

  if (!required) return null;

  return _react2.default.createElement(
    "span",
    null,
    requiredTagText()
  );
}