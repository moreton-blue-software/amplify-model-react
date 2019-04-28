"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.ModelFormControllerProvider = ModelFormControllerProvider;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _immutable = require("immutable");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModelFormControllerContext = _react2.default.createContext();

var objectTypes = void 0;

function ModelFormControllerProvider(props) {
  var schema = props.schema;

  var _React$useState = _react2.default.useState((0, _immutable.Map)({})),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      formMap = _React$useState2[0],
      setFormMap = _React$useState2[1];

  // console.log('>>ModelFormController/index::', 'schema', schema); //TRACE

  var contextState = _react2.default.useMemo(function () {
    return {
      schema: schema,
      formMap: formMap.toJS(),
      setFormMap: setFormMap,
      getModelSchema: function getModelSchema(name) {
        if (!objectTypes) {
          objectTypes = (0, _get2.default)(schema, "data.__schema.types", []).filter(function (o) {
            if (o.kind !== "OBJECT") return;
            if (o.fields.find(function (f) {
              return f.name === "id";
            }) === undefined) return;
            return true;
          });
        }
        var objectType = objectTypes.find(function (objType) {
          return objType.name === name;
        });
        var flatFields = (0, _get2.default)(objectType, "fields", []).filter(function (f) {
          var kind = (0, _get2.default)(f, "type.ofType.kind") || (0, _get2.default)(f, "type.kind");
          return kind !== "OBJECT";
        });
        return {
          model: objectType,
          flatFields: flatFields,
          basicFieldsString: "    " + flatFields.map(function (f) {
            return f.name;
          }).join("\n        ")
        };
      }
    };
  }, [formMap]);
  return _react2.default.createElement(
    ModelFormControllerContext.Provider,
    { value: contextState },
    props.children
  );
}
exports.default = ModelFormControllerContext;