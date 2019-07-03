"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertProvider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.useConfirmAync = useConfirmAync;
exports.useConfirm = useConfirm;
exports.default = Modal;

var _reactn = require("reactn");

var _reactn2 = _interopRequireDefault(_reactn);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Dialog = require("@material-ui/core/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogActions = require("@material-ui/core/DialogActions");

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _DialogContent = require("@material-ui/core/DialogContent");

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogContentText = require("@material-ui/core/DialogContentText");

var _DialogContentText2 = _interopRequireDefault(_DialogContentText);

var _DialogTitle = require("@material-ui/core/DialogTitle");

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var AlertProvider = exports.AlertProvider = (0, _reactn.createProvider)({
  confirm: { opened: false }
});

function useConfirmAync() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      content = _ref.content,
      title = _ref.title;

  var _AlertProvider$useGlo = AlertProvider.useGlobal("confirm"),
      _AlertProvider$useGlo2 = _slicedToArray(_AlertProvider$useGlo, 2),
      setConfirm = _AlertProvider$useGlo2[1];

  var fn = _reactn2.default.useCallback(function () {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new Promise(function (resolve, reject) {
      if (AlertProvider.getGlobal().confirm.opened) return;
      setConfirm(_extends({
        content: content,
        title: title
      }, opts, {
        onOk: function onOk() {
          return resolve(true);
        },
        onCancel: function onCancel() {
          return resolve(false);
        },
        opened: true
      }));
    });
  }, []);

  return fn;
}

function useConfirm() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      content = _ref2.content,
      title = _ref2.title,
      onOk = _ref2.onOk,
      onCancel = _ref2.onCancel;

  var _AlertProvider$useGlo3 = AlertProvider.useGlobal("confirm"),
      _AlertProvider$useGlo4 = _slicedToArray(_AlertProvider$useGlo3, 2),
      confirm = _AlertProvider$useGlo4[0],
      setConfirm = _AlertProvider$useGlo4[1];

  var handlers = _reactn2.default.useMemo(function () {
    return {
      open: function open() {
        if (AlertProvider.getGlobal().confirm.opened) return;
        setConfirm({ content: content, title: title, onOk: onOk, onCancel: onCancel, opened: true });
      },
      close: function close() {
        setConfirm(_extends({}, AlertProvider.getGlobal().confirm, { opened: false }));
      }
    };
  }, [content, title, onOk, onCancel]);

  return _extends({}, confirm, handlers);
}

function Modal(props) {
  _objectDestructuringEmpty(props);

  var _useConfirm = useConfirm(),
      opened = _useConfirm.opened,
      content = _useConfirm.content,
      title = _useConfirm.title,
      close = _useConfirm.close,
      _onOk = _useConfirm.onOk,
      _onCancel = _useConfirm.onCancel;

  var handlers = _reactn2.default.useMemo(function () {
    return {
      onOk: function onOk() {
        _onOk && _onOk();
        close();
      },
      onCancel: function onCancel() {
        _onCancel && _onCancel();
        close();
      }
    };
  }, [_onOk, _onCancel, close]);
  return _reactn2.default.createElement(
    _Dialog2.default,
    {
      open: opened,
      onClose: close,
      "aria-labelledby": "alert-dialog-title",
      "aria-describedby": "alert-dialog-description"
    },
    _reactn2.default.createElement(
      _DialogTitle2.default,
      { id: "alert-dialog-title" },
      title || "Alert"
    ),
    _reactn2.default.createElement(
      _DialogContent2.default,
      null,
      _reactn2.default.createElement(
        _DialogContentText2.default,
        { id: "alert-dialog-description" },
        content
      )
    ),
    _reactn2.default.createElement(
      _DialogActions2.default,
      null,
      _reactn2.default.createElement(
        _Button2.default,
        { onClick: handlers.onOk, color: "primary" },
        "OK"
      ),
      _reactn2.default.createElement(
        _Button2.default,
        { onClick: handlers.onCancel, color: "primary", autoFocus: true },
        "CANCEL"
      )
    )
  );
}