'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAsyncEffect;

var _require = require('react'),
    useEffect = _require.useEffect,
    useRef = _require.useRef;

function useAsyncEffect(effect, destroy, inputs) {
  var hasDestroy = typeof destroy === 'function';
  var mounted = useRef();

  useEffect(function () {
    mounted.current = true;

    var result = void 0;
    var maybePromise = effect(function () {
      return mounted.current;
    });

    Promise.resolve(maybePromise).then(function (value) {
      result = value;
    });

    return function () {
      mounted.current = false;

      if (hasDestroy) {
        destroy(result);
      }
    };
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  hasDestroy ? inputs : destroy);
}