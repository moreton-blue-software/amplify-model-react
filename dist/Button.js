"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  _react2.default.useEffect(function () {
    console.log(">>src/Button::", "test"); //TRACE
  }, []);
  return _react2.default.createElement(
    _Button2.default,
    null,
    "hello 2"
  );
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }