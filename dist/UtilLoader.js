"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UtilLoader;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaultUtils = [_index.Alerts];

function UtilLoader(props) {
  var _props$utils = props.utils,
      utils = _props$utils === undefined ? [] : _props$utils;


  var allUtils = _react2.default.useMemo(function () {
    return [].concat(defaultUtils, _toConsumableArray(utils));
  }, [utils]);

  return _react2.default.createElement(
    _react2.default.Suspense,
    { fallback: _react2.default.createElement("div", null) },
    allUtils.map(function (util, ii) {
      var UtilComponent = util.default || util;
      return _react2.default.createElement(UtilComponent, { key: ii });
    })
  );
}