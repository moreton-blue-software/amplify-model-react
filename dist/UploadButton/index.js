"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CloudUpload = require("@material-ui/icons/CloudUpload");

var _CloudUpload2 = _interopRequireDefault(_CloudUpload);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _nanoid = require("nanoid");

var _nanoid2 = _interopRequireDefault(_nanoid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var UploadButton = _react2.default.memo(function (_ref) {
  var hasSelectedFile = _ref.hasSelectedFile,
      handleUpload = _ref.onChange,
      accept = _ref.accept,
      multiple = _ref.multiple,
      url = _ref.url,
      labelText = _ref.labelText,
      rest = _objectWithoutProperties(_ref, ["hasSelectedFile", "onChange", "accept", "multiple", "url", "labelText"]);

  console.log(">>UploadButton/index::", "multiple", accept); //TRACE

  var _React$useState = _react2.default.useState("upload-button@" + labelText + "-" + (0, _nanoid2.default)()),
      _React$useState2 = _slicedToArray(_React$useState, 1),
      id = _React$useState2[0];

  return _react2.default.createElement(
    "div",
    {
      style: {
        // width: 640, height: 400,
        margin: "10px 0"
      }
    },
    _react2.default.createElement("input", {
      onChange: handleUpload,
      accept: accept,
      style: { display: "none" },
      id: id,
      multiple: multiple,
      type: "file"
    }),
    _react2.default.createElement(
      "label",
      { htmlFor: id },
      _react2.default.createElement(
        _Button2.default,
        _extends({}, rest, {
          component: "span",
          style: { marginBottom: 10 },
          variant: "contained"
        }),
        _react2.default.createElement(
          _Typography2.default,
          { variant: "body1" },
          _react2.default.createElement(_CloudUpload2.default, {
            fontSize: "small",
            style: { marginRight: 10, marginBottom: -5 }
          }),
          hasSelectedFile ? "Change" : "Upload",
          " ",
          labelText || "file"
        )
      )
    ),
    hasSelectedFile && _react2.default.createElement(
      _Button2.default,
      {
        variant: "contained",
        component: "span",
        onClick: function onClick() {
          return handleUpload(null);
        },
        style: { marginBottom: 10, marginLeft: 5 }
      },
      _react2.default.createElement(
        _Typography2.default,
        { variant: "body1" },
        "Remove",
        multiple ? " All" : ""
      )
    )
  );
});

UploadButton.defaultProps = {
  multiple: false
};

UploadButton.propTypes = {
  multiple: _propTypes2.default.bool,
  accept: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  file: _propTypes2.default.instanceOf(File),
  url: _propTypes2.default.string
};

exports.default = UploadButton;