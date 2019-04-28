"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ModelFieldDateTime;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ModelForm = require("../ModelForm");

var _startCase = require("lodash/startCase");

var _startCase2 = _interopRequireDefault(_startCase);

var _FormControl = require("@material-ui/core/FormControl");

var _FormControl2 = _interopRequireDefault(_FormControl);

var _padStart = require("lodash/padStart");

var _padStart2 = _interopRequireDefault(_padStart);

var _materialUiPickers = require("material-ui-pickers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ModelFieldDateTime(props) {
  var field = props.field,
      _props$dateOnly = props.dateOnly,
      dateOnly = _props$dateOnly === undefined ? false : _props$dateOnly,
      label = props.label,
      _props$pickerProps = props.pickerProps,
      pickerProps = _props$pickerProps === undefined ? {} : _props$pickerProps;

  var labelText = label || (0, _startCase2.default)(field);

  var _React$useContext = _react2.default.useContext(_ModelForm.ModelFormContext),
      handlers = _React$useContext.handlers;

  var rawValue = handlers.getFieldValue(field);
  var Picker = dateOnly ? _materialUiPickers.DatePicker : _materialUiPickers.DateTimePicker;
  var value = rawValue ? new Date(rawValue) : "";
  var checkDate = _react2.default.useCallback(function (mDate) {
    // if (!mDate || !mDate._d) return;
    var minuteOffset = mDate.getTimezoneOffset();
    var date = new Date(mDate.getTime());
    date.setMinutes(date.getMinutes() + minuteOffset);
    var month = (0, _padStart2.default)(date.getMonth() + 1, 2, "0");
    var day = (0, _padStart2.default)(date.getDate(), 2, "0");
    var year = date.getFullYear();
    var hours = (0, _padStart2.default)(date.getHours(), 2, "0");
    var minutes = (0, _padStart2.default)(date.getMinutes(), 2, "0");
    var awsDate = year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":00.000Z";
    handlers.setFieldValue(field, awsDate);
  }, [field, handlers]);
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      _FormControl2.default,
      { fullWidth: true },
      _react2.default.createElement(Picker, _extends({}, pickerProps, {
        value: value,
        onChange: checkDate,
        label: labelText
      }))
    )
  );
}