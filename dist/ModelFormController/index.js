"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelFormGlobalProvider = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.ModelFormControllerProvider = ModelFormControllerProvider;

var _reactn = require("reactn");

var _reactn2 = _interopRequireDefault(_reactn);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _merge = require("lodash/fp/merge");

var _merge2 = _interopRequireDefault(_merge);

var _UtilLoader = require("../UtilLoader");

var _UtilLoader2 = _interopRequireDefault(_UtilLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModelFormGlobalProvider = exports.ModelFormGlobalProvider = (0, _reactn.createProvider)({
  formMap: {}
});

var ModelFormControllerContext = _reactn2.default.createContext();

var objectTypes = void 0;

function ModelFormControllerProvider(props) {
  var schema = props.schema;
  // console.log('>>ModelFormController/index::', 'schema', schema); //TRACE

  var _ModelFormGlobalProvi = ModelFormGlobalProvider.useGlobal("formMap"),
      _ModelFormGlobalProvi2 = _slicedToArray(_ModelFormGlobalProvi, 2),
      formMap = _ModelFormGlobalProvi2[0],
      _setFormMap = _ModelFormGlobalProvi2[1];

  var contextState = _reactn2.default.useMemo(function () {
    return {
      schema: schema,
      formMap: formMap,
      getFormMap: function getFormMap() {
        return ModelFormGlobalProvider.getGlobal().formMap;
      },
      setFormMap: function setFormMap(formData) {
        _setFormMap((0, _merge2.default)(ModelFormGlobalProvider.getGlobal().formMap)(formData));
      },
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
        if (!objectType) throw new Error("Model with name \"" + name + "\" is not found.");
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
  return _reactn2.default.createElement(
    ModelFormControllerContext.Provider,
    { value: contextState },
    props.children,
    _reactn2.default.createElement(_UtilLoader2.default, null)
  );
}
exports.default = ModelFormControllerContext;