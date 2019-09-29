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

var _Paper = require("@material-ui/core/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _styles = require("@material-ui/core/styles");

var _storage = require("@aws-amplify/storage");

var _storage2 = _interopRequireDefault(_storage);

var _set = require("lodash/fp/set");

var _set2 = _interopRequireDefault(_set);

var _set3 = require("lodash/set");

var _set4 = _interopRequireDefault(_set3);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// const Renderer = React.memo(props=>{
//   const renderObj =
//   return
// });

function ProgressDisplay(_ref) {
  var onDone = _ref.onDone,
      onError = _ref.onError,
      filepath = _ref.filepath,
      storageOpts = _ref.storageOpts,
      file = _ref.file;

  var _React$useState = _react2.default.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  _react2.default.useEffect(function () {
    var um = false;
    _storage2.default.put(filepath, file, _extends({
      progressCallback: function progressCallback(progress) {
        if (um) return;
        var progressPercentage = progress.loaded / progress.total * 100;
        setState(Math.floor(progressPercentage));
      }
    }, storageOpts)).then(function (storeData) {
      onDone(storeData);
    }).catch(function (e) {
      onError(e);
    });
    return function () {
      return um = true;
    };
  }, []);
  return _react2.default.createElement(
    "span",
    null,
    "Uploading attachments.. ",
    state,
    "%"
  );
}

var useUploaderStyles = (0, _styles.makeStyles)({
  multipleDisplay: {
    "& > div": {
      minHeight: 30,
      padding: 10
    }
  }
});

var Uploader = function Uploader(props) {
  var _props$accept = props.accept,
      accept = _props$accept === undefined ? "video/*" : _props$accept,
      label = props.label,
      multiple = props.multiple,
      field = props.field,
      render = props.render,
      storageOpts = props.storageOpts,
      defaultModelValue = props.defaultModelValue,
      beforeFileUpload = props.beforeFileUpload,
      _onChange = props.onChange;

  var _React$useState3 = _react2.default.useState({
    url: null,
    file: undefined
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      fileData = _React$useState4[0],
      setFileData = _React$useState4[1];

  var classes = useUploaderStyles();

  var _React$useState5 = _react2.default.useState([]),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      fileListData = _React$useState6[0],
      setFileListData = _React$useState6[1];

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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
        // console.log("1234: before saving delay", contextData, parentData);
        var uploadFile = function () {
          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(rawFile) {
            var filepath, uploadSnackbar, file, metadata, beforeFileUploadData, tmpFile, tmpMetadata, storeDataPromise, storeData;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    filepath = parentData.id + "/" + rawFile.name;
                    uploadSnackbar = void 0;
                    file = rawFile;
                    metadata = void 0;

                    if (!beforeFileUpload) {
                      _context.next = 9;
                      break;
                    }

                    _context.next = 7;
                    return beforeFileUpload(rawFile);

                  case 7:
                    beforeFileUploadData = _context.sent;

                    if (beforeFileUploadData) {
                      if (beforeFileUploadData.metadata) {
                        tmpFile = beforeFileUploadData.file, tmpMetadata = beforeFileUploadData.metadata;

                        if (tmpFile !== undefined) {
                          file = tmpFile;
                        }
                        metadata = tmpMetadata;
                      } else {
                        file = beforeFileUploadData;
                      }
                    }

                  case 9:
                    storeDataPromise = new _bluebird2.default(function (resolve, reject) {
                      uploadSnackbar = enqueueSnackbar(
                      // `Uploading attachments.. ${progressPercentage}%`,
                      _react2.default.createElement(ProgressDisplay, _extends({ file: file, filepath: filepath, storageOpts: storageOpts }, {
                        onDone: resolve,
                        onError: reject
                      })), {
                        variant: "info",
                        persist: true
                      });
                    });
                    _context.next = 12;
                    return storeDataPromise;

                  case 12:
                    storeData = _context.sent;

                    closeSnackbar(uploadSnackbar);
                    return _context.abrupt("return", _extends({
                      filename: storeData.key
                    }, metadata || {}));

                  case 15:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          return function uploadFile(_x2) {
            return _ref4.apply(this, arguments);
          };
        }();

        var contextData = _ref3.context.data,
            parentData = _ref3.parent.data;
        var file, retFields, fieldRoot, filesUpls, storeData, rest;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                file = fileData.file;
                retFields = {};

                if (!field) {
                  _context2.next = 43;
                  break;
                }

                fieldRoot = field.split(".")[0];
                _context2.prev = 4;

                if (parentData.id) {
                  _context2.next = 8;
                  break;
                }

                console.log("1234: no parent data id found!.");
                return _context2.abrupt("return", {});

              case 8:
                _context2.next = 10;
                return _bluebird2.default.delay(500);

              case 10:
                if (!(fileListData && fileListData.length > 0)) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 13;
                return _bluebird2.default.map(fileListData, function (fileData) {
                  if (fileData.file) return uploadFile(fileData.file);

                  // return {fileData.u}
                }, { concurrency: 4 });

              case 13:
                filesUpls = _context2.sent;

                console.log(">>ModelFieldFile/index::", "filesUpls", filesUpls); //TRACE
                _context2.next = 27;
                break;

              case 17:
                retFields = _defineProperty({}, fieldRoot, parentData[fieldRoot]);

                if (!file) {
                  _context2.next = 26;
                  break;
                }

                _context2.next = 21;
                return uploadFile(file);

              case 21:
                storeData = _context2.sent;

                console.log(">>ModelFieldFile/index::" + field, "xxretFields", retFields); //TRACE

                (0, _set4.default)(retFields, field, storeData);
                _context2.next = 27;
                break;

              case 26:
                if (file === null) {
                  (0, _set4.default)(retFields, field, null);
                }

              case 27:

                //omit all fields except file field and id
                Object.keys(retFields).forEach(function (k) {
                  if (fieldRoot !== k) {
                    retFields[k] = undefined;
                  } else {
                    if (!!(0, _get2.default)(retFields, [k, "length"])) {
                      // an array
                      retFields[k].forEach(function (retFieldItem) {
                        if (retFieldItem) retFieldItem["__typename"] = undefined;
                      });
                    } else if (!!retFields[k]) {
                      // an object
                      retFields[k]["__typename"] = undefined;
                    }
                  }
                });
                rest = _objectWithoutProperties(contextData, []);

                Object.keys(rest).forEach(function (k) {
                  if (!retFields.hasOwnProperty(k)) {
                    retFields[k] = undefined;
                  }
                });
                retFields.id = parentData.id;
                _context2.next = 38;
                break;

              case 33:
                _context2.prev = 33;
                _context2.t0 = _context2["catch"](4);

                enqueueSnackbar("Something went wrong with saving video", {
                  variant: "error"
                });
                console.log("1234: SOMETHING WENT WRONG UPLOAD AND INSERT ", _context2.t0);
                return _context2.abrupt("return", false);

              case 38:
                _context2.prev = 38;

                console.log("1234: before saving delay done");
                // console.log(">>ModelFieldFile/index::", "retFields", retFields); //TRACE
                // closeSnackbar(uploadSnackbar);
                // throw Error(JSON.stringify(retFields));
                console.log(">>ModelFieldFile/index::" + field, "retFields", retFields); //TRACE
                return _context2.abrupt("return", retFields);

              case 43:
                return _context2.abrupt("return", false);

              case 44:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, undefined, [[4, 33, 38, 43]]);
      }));

      return function beforeSave(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    handlers.attachBeforeSave(beforeSave, 1);
    return function () {
      handlers.detachBeforeSave(beforeSave);
    };
  }, [fileData.file, field, fileListData]);

  _react2.default.useEffect(function () {
    var hasCancelled = false;
    var url = handlers.getFieldValue(field);
    console.log(">>ModelFieldFile/index::", "url", url); //TRACE
    var filename = (0, _get2.default)(url, "filename");
    if (filename) {
      _storage2.default.get(filename, _extends({}, storageOpts)).then(function (result) {
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
    var metadata = handlers.getFieldValue(field);
    return render && render({ file: fileData.file, url: fileData.url, metadata: metadata });
  }, [fileData, render]);
  console.log(">>ModelFieldFile/index::", "fileData", fileListData); //TRACE
  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(_UploadButton2.default, {
      labelText: label,
      multiple: multiple,
      onChange: function onChange(e) {
        var fileList = (0, _get2.default)(e, "target.files", []);
        if (multiple) {
          setFileListData(function (oldFileListData) {
            return [].concat(_toConsumableArray(oldFileListData), _toConsumableArray([].concat(_toConsumableArray(fileList)).map(function (f) {
              return { file: f };
            })));
          });
        } else {
          setFileData(function (oldFileData) {
            return _extends({}, oldFileData, {
              file: fileList[0] || null,
              url: null
            });
          });
        }
        _onChange && _onChange(fileList);
      },
      accept: accept,
      hasSelectedFile: hasSelectedFile
      // file={fileData.get('file')}
      // url={fileData.get('url')}
    }),
    hasSelectedFile && !multiple && renderFn,
    multiple && _react2.default.createElement(
      "div",
      { className: classes.multipleDisplay },
      fileListData.map(function (fileData, ii) {
        return _react2.default.createElement(
          _Paper2.default,
          { key: ii },
          render({ file: fileData.file, url: fileData.url }),
          _react2.default.createElement(
            _Button2.default,
            {
              size: "small",
              style: { float: "right" },
              onClick: function onClick() {
                setFileListData(function (oldFileListData) {
                  return oldFileListData.filter(function (v, indx) {
                    return indx !== ii;
                  });
                });
              }
            },
            "Remove"
          )
        );
      })
    )
  );
};

function ModelFieldFile(props) {
  var field = props.field,
      accept = props.accept,
      render = props.render,
      _props$label = props.label,
      label = _props$label === undefined ? "File" : _props$label,
      buttonLabel = props.buttonLabel,
      multiple = props.multiple,
      _props$storageOpts = props.storageOpts,
      storageOpts = _props$storageOpts === undefined ? {} : _props$storageOpts,
      onChange = props.onChange,
      beforeFileUpload = props.beforeFileUpload;

  var _React$useContext2 = _react2.default.useContext(_ModelForm.ModelFormContext),
      name = _React$useContext2.name,
      modelData = _React$useContext2.data,
      handlers = _React$useContext2.handlers;
  // const [state, setState] = React.useState(Map({ defaultValue: null }));


  var defaultValue = _react2.default.useMemo(function () {
    // const m = { id: modelData.id };
    // set(m, field, get(modelData, field));
    return modelData;
  }, [modelData]);
  console.log(">>ModelFieldFile/index::" + field, "defaultValue", defaultValue); //TRACE
  return _react2.default.createElement(
    _ModelForm2.default
    // key={modelData.id} //added this so it reloads the form with the default value
    ,
    { name: name,
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
        multiple: multiple,
        onChange: onChange,
        storageOpts: storageOpts,
        beforeFileUpload: beforeFileUpload,
        defaultModelValue: defaultValue
      })
    )
  );
}