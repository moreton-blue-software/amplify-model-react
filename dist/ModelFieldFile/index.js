"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = ModelFieldFile;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ModelForm = require("../ModelForm");

var _ModelForm2 = _interopRequireDefault(_ModelForm);

var _notistack = require("notistack");

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _capitalize = require("lodash/capitalize");

var _capitalize2 = _interopRequireDefault(_capitalize);

var _UploadButton = require("../UploadButton");

var _UploadButton2 = _interopRequireDefault(_UploadButton);

var _awsAmplify = require("aws-amplify");

var _set = require("lodash/fp/set");

var _set2 = _interopRequireDefault(_set);

var _merge = require("lodash/fp/merge");

var _merge2 = _interopRequireDefault(_merge);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// const Renderer = React.memo(props=>{
//   const renderObj =
//   return
// });

var Uploader = function Uploader(props) {
  var _props$accept = props.accept,
      accept = _props$accept === undefined ? "video/*" : _props$accept,
      label = props.label,
      field = props.field,
      render = props.render,
      storageOpts = props.storageOpts;

  var _React$useState = _react2.default.useState({ url: null, file: null }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      fileData = _React$useState2[0],
      setFileData = _React$useState2[1];

  var _React$useContext = _react2.default.useContext(_ModelForm.ModelFormContext),
      data = _React$useContext.data,
      state = _React$useContext.state,
      handlers = _React$useContext.handlers;

  var _useSnackbar = (0, _notistack.useSnackbar)(),
      enqueueSnackbar = _useSnackbar.enqueueSnackbar,
      closeSnackbar = _useSnackbar.closeSnackbar;

  _react2.default.useEffect(function () {
    console.log("1234: before re-attching..");

    var beforeSave = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var contextData = _ref2.context.data,
            parentData = _ref2.parent.data;
        var file, retFields, uploadSnackbar, filepath, storeData, rest;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // console.log("1234: before saving delay", contextData, parentData);
                file = fileData.file;
                retFields = {};
                uploadSnackbar = void 0;

                if (!(file && field)) {
                  _context.next = 32;
                  break;
                }

                _context.next = 6;
                return _bluebird2.default.delay(1000);

              case 6:
                _context.prev = 6;

                if (parentData.id) {
                  _context.next = 10;
                  break;
                }

                console.log("1234: no parent data id found!.");
                return _context.abrupt("return", {});

              case 10:
                filepath = parentData.id + "/" + file.name;

                uploadSnackbar = enqueueSnackbar("Uploading attachments..", {
                  variant: "info",
                  persist: true
                });
                _context.next = 14;
                return _awsAmplify.Storage.put(filepath, file, _extends({}, storageOpts));

              case 14:
                storeData = _context.sent;

                enqueueSnackbar("Attchments saved.", { variant: "success" });
                //omit all fields except file field and id
                rest = _objectWithoutProperties(contextData, []);

                Object.keys(rest).forEach(function (k) {
                  retFields[k] = undefined;
                });
                retFields.id = parentData.id;
                retFields[field] = { filename: storeData.key };
                _context.next = 27;
                break;

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](6);

                enqueueSnackbar("Something went wrong with saving video", {
                  variant: "error"
                });
                console.log("1234: SOMETHING WENT WRONG UPLOAD AND INSERT ", _context.t0);
                return _context.abrupt("return", false);

              case 27:
                _context.prev = 27;

                console.log("1234: before saving delay done");
                // console.log(">>ModelFieldFile/index::", "retFields", retFields); //TRACE
                closeSnackbar(uploadSnackbar);
                return _context.abrupt("return", retFields);

              case 32:
                return _context.abrupt("return", false);

              case 33:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined, [[6, 22, 27, 32]]);
      }));

      return function beforeSave(_x) {
        return _ref.apply(this, arguments);
      };
    }();
    handlers.attachBeforeSave(beforeSave, 1);
    return function () {
      handlers.detachBeforeSave(beforeSave);
    };
  }, [fileData.file, field]);

  _react2.default.useEffect(function () {
    var hasCancelled = false;
    var url = handlers.getFieldValue(field);
    // console.log(">>ModelFieldFile/index::", "url", url); //TRACE
    var filename = (0, _get2.default)(url, "filename");
    if (filename) {
      _awsAmplify.Storage.get(filename, _extends({}, storageOpts)).then(function (result) {
        // console.log(">>ModelFieldFile/index::", "result", result); //TRACE
        if (!hasCancelled) setFileData((0, _set2.default)("url", result));
      }).catch(function (err) {
        return console.error(err);
      });
    }
    return function () {
      hasCancelled = true;
    };
  }, [field]);

  var hasSelectedFile = fileData.file || fileData.url;

  var renderFn = _react2.default.useMemo(function () {
    return render && render({ file: fileData.file, url: fileData.url });
  }, [fileData, render]);
  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(_UploadButton2.default, {
      labelText: label,
      onChange: function onChange(e) {
        console.log(e.target.files[0]);
        var file = e.target.files[0];
        // console.log(">>ModelFieldFile/index::", "file", file); //TRACE
        setFileData((0, _merge2.default)({ file: file, url: null }));
      },
      accept: accept,
      hasSelectedFile: hasSelectedFile
      // file={fileData.get('file')}
      // url={fileData.get('url')}
    }),
    hasSelectedFile && renderFn
  );
};

function ModelFieldFile(props) {
  var field = props.field,
      accept = props.accept,
      render = props.render,
      _props$label = props.label,
      label = _props$label === undefined ? "File" : _props$label,
      buttonLabel = props.buttonLabel,
      _props$storageOpts = props.storageOpts,
      storageOpts = _props$storageOpts === undefined ? {} : _props$storageOpts;

  var _React$useContext2 = _react2.default.useContext(_ModelForm.ModelFormContext),
      name = _React$useContext2.name,
      modelData = _React$useContext2.data,
      handlers = _React$useContext2.handlers;
  // const [state, setState] = React.useState(Map({ defaultValue: null }));

  var defaultValue = _react2.default.useMemo(function () {
    var _ref3;

    return _ref3 = {}, _defineProperty(_ref3, field, modelData[field]), _defineProperty(_ref3, "id", modelData.id), _ref3;
  }, [modelData]);

  return _react2.default.createElement(
    _ModelForm2.default,
    {
      key: modelData.id //added this so it reloads the form with the default value
      , name: name,
      defaultModelValue: defaultValue
    },
    _react2.default.createElement(
      "div",
      { style: { marginTop: 15 } },
      _react2.default.createElement(
        "label",
        null,
        label
      ),
      _react2.default.createElement(Uploader, {
        label: buttonLabel || label,
        accept: accept,
        field: field,
        render: render,
        storageOpts: storageOpts
      })
    )
  );
}