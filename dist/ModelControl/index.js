'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelControlContext = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = ModelControl;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModelForm = require('../ModelForm');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _groupBy = require('lodash/groupBy');

var _groupBy2 = _interopRequireDefault(_groupBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModelControlContext = exports.ModelControlContext = _react2.default.createContext();

function ModelControl(_ref) {
  var _ref$required = _ref.required,
      required = _ref$required === undefined ? false : _ref$required,
      requiredLabel = _ref.requiredLabel,
      children = _ref.children;

  var form = _react2.default.useContext(_ModelForm.ModelFormContext);
  var handlers = form.handlers;

  var _React$useState = _react2.default.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      fields = _React$useState2[0],
      setFields = _React$useState2[1];

  var _React$useState3 = _react2.default.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      errors = _React$useState4[0],
      setErrors = _React$useState4[1];

  var formData = form.data;

  var _React$useState5 = _react2.default.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      touched = _React$useState6[0],
      setTouched = _React$useState6[1];

  var validate = _react2.default.useCallback(function () {
    var errors = [];
    Object.entries(fields).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          fieldName = _ref3[0],
          flag = _ref3[1];

      if (flag) {
        var fieldValue = (0, _get2.default)(formData, fieldName);
        if (!fieldValue && required) {
          var error = '"' + fieldName + '" should not be empty';
          errors.push({ field: fieldName, message: error });
        }
      }
    });
    return { errors: errors };
  }, [fields, formData, required]);

  _react2.default.useEffect(function () {
    var checkValid = function checkValid() {
      var _validate = validate(),
          errors = _validate.errors;

      setTouched(true);
      return !(errors.length > 0);
    };
    handlers.attachBeforeSave(checkValid, 4);
    return function () {
      handlers.detachBeforeSave(checkValid);
    };
  }, [fields, handlers, validate]);

  _react2.default.useEffect(function () {
    if (!touched) return;
    //validations

    var _validate2 = validate(),
        errors = _validate2.errors;

    var errorsByKey = (0, _groupBy2.default)(errors, 'field');
    var errorMsgs = [];
    var errorFields = {};
    Object.entries(errorsByKey).map(function (entry) {
      var _entry = _slicedToArray(entry, 2),
          field = _entry[0],
          errors = _entry[1];

      var errList = [];
      errors.forEach(function (_ref4) {
        var message = _ref4.message;

        errorMsgs.push(message);
        errList.push(message);
      });
      errorFields[field] = errList;
    });
    setErrors(errorMsgs);
    handlers.setFieldErrors(function (oldState) {
      return _extends({}, oldState, errorFields);
    });
  }, [handlers, required, touched, validate]);

  return _react2.default.createElement(
    ModelControlContext.Provider,
    {
      value: {
        required: required,
        touched: touched,
        setTouched: setTouched,
        setFields: setFields,
        requiredLabel: requiredLabel,
        errors: errors,
        hasErrors: errors.length > 0
      } },
    children
  );
}