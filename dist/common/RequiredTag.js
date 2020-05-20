'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requiredTagText = requiredTagText;
exports.useRequiredTagText = useRequiredTagText;
exports.default = RequiredTag;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModelControl = require('../ModelControl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/no-multi-comp */
var DEFAULT_TEXT = '(required)';

function Tag() {
  var ctx = _react2.default.useContext(_ModelControl.ModelControlContext);

  return _react2.default.createElement(
    'span',
    null,
    ctx.requiredLabel || DEFAULT_TEXT
  );
}

function requiredTagText() {
  return _react2.default.createElement(Tag, null);
}

function useRequiredTagText() {
  var ctx = _react2.default.useContext(_ModelControl.ModelControlContext);
  return ctx.requiredLabel || DEFAULT_TEXT;
}

function RequiredTag() {
  var ctx = _react2.default.useContext(_ModelControl.ModelControlContext);
  var required = ctx && ctx.required;

  if (!required) return null;

  return _react2.default.createElement(
    'span',
    null,
    requiredTagText()
  );
}