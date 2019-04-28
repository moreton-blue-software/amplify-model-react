"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = ModelFieldInput;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ModelForm = require("../ModelForm");

var _capitalize = require("lodash/capitalize");

var _capitalize2 = _interopRequireDefault(_capitalize);

var _debounce = require("lodash/debounce");

var _debounce2 = _interopRequireDefault(_debounce);

var _TextField = require("@material-ui/core/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ModelFieldInput(props) {
  var field = props.field,
      label = props.label,
      disabled = props.disabled,
      format = props.format;

  var _React$useContext = _react2.default.useContext(_ModelForm.ModelFormContext),
      state = _React$useContext.state,
      handlers = _React$useContext.handlers;

  var _React$useState = _react2.default.useState(""),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      txt = _React$useState2[0],
      setTxt = _React$useState2[1];

  var defaultValue = handlers.getFieldValue(field, "");
  var inputId = handlers.getFieldValue("id") + "@" + field;

  _react2.default.useEffect(function () {
    setTxt(defaultValue);
  }, [defaultValue]);

  var updateField = (0, _debounce2.default)(function (targetValue) {
    handlers.setFieldValue(targetValue.id, targetValue.value);
  }, 200);

  var handleInputChange = _react2.default.useCallback(function (e) {
    var _e$target = e.target,
        id = _e$target.id,
        value = _e$target.value;

    setTxt(value);
    updateField({ id: id, value: value });
  }, []);

  var formattedValue = _react2.default.useMemo(function () {
    var txtValue = txt || "";
    if (format) return format(txtValue);
    return txtValue;
  }, [format, txt]);

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "label",
      null,
      label || (0, _capitalize2.default)(field)
    ),
    _react2.default.createElement(_TextField2.default
    // success={this.state.requiredState === 'success'}
    // error={this.state.requiredState === 'error'}

    , { id: field,
      key: inputId,
      fullWidth: true,
      inputProps: {
        id: field,
        key: inputId,
        disabled: disabled,
        onChange: handleInputChange,
        value: formattedValue
      }
    })
  );
}