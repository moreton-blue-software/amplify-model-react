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

var _FormHelperText = require("@material-ui/core/FormHelperText");

var _FormHelperText2 = _interopRequireDefault(_FormHelperText);

var _FormControl = require("@material-ui/core/FormControl");

var _FormControl2 = _interopRequireDefault(_FormControl);

var _styles = require("@material-ui/core/styles");

var _RequiredTag = require("./../common/RequiredTag");

var _RequiredTag2 = _interopRequireDefault(_RequiredTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useStyle = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      color: function color(props) {
        return props.hasErrors ? theme.palette.error.main : "inherit";
      },
      "& > p": {
        color: "inherit"
      }
    }
  };
});
function ModelFieldInput(props) {
  var field = props.field,
      label = props.label,
      disabled = props.disabled,
      format = props.format;

  var _useModelForm = (0, _ModelForm.useModelForm)({ field: field }),
      form = _useModelForm.form,
      control = _useModelForm.control;

  var state = form.state,
      handlers = form.handlers;


  console.log(">>ModelFieldInput/index::", "control", control); //TRACE
  var errors = control.errors,
      hasErrors = control.hasErrors;


  var classes = useStyle({ hasErrors: hasErrors });

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
    handlers.setFieldValue(targetValue.id, targetValue.value === "" ? null : targetValue.value);
  }, 200);

  var handleInputChange = _react2.default.useCallback(function (e) {
    var _e$target = e.target,
        id = _e$target.id,
        value = _e$target.value;

    control && control.setTouched(true);
    setTxt(value);
    updateField({ id: id, value: value });
  }, []);

  var formattedValue = _react2.default.useMemo(function () {
    var txtValue = txt || "";
    if (format) return format(txtValue);
    return txtValue;
  }, [format, txt]);

  var onBlur = _react2.default.useCallback(function () {
    control && control.setTouched(true);
  }, []);

  // const Wrapper = React.useMemo(()=>{

  // },[
  //   hasErrors
  // ]);

  return _react2.default.createElement(
    "div",
    { className: classes.root },
    _react2.default.createElement(
      "label",
      null,
      label || (0, _capitalize2.default)(field),
      _react2.default.createElement(_RequiredTag2.default, null)
    ),
    _react2.default.createElement(_TextField2.default
    // success={this.state.requiredState === 'success'}
    // error={this.state.requiredState === 'error'}
    , { error: hasErrors,
      id: field,
      key: inputId,
      fullWidth: true,
      inputProps: {
        id: field,
        key: inputId,
        onBlur: onBlur,
        disabled: disabled,
        onChange: handleInputChange,
        value: formattedValue
      }
    }),
    hasErrors && _react2.default.createElement(
      _FormHelperText2.default,
      null,
      errors.map(function (error) {
        return error;
      })
    )
  );
}