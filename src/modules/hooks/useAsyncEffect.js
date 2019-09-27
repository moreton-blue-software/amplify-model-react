const { useEffect, useRef } = require('react');

export default function useAsyncEffect(effect, destroy, inputs) {
  const hasDestroy = typeof destroy === 'function';
  const mounted = useRef();

  useEffect(
    () => {
      mounted.current = true;

      let result;
      const maybePromise = effect(() => mounted.current);

      Promise.resolve(maybePromise).then(value => {
        result = value;
      });

      return () => {
        mounted.current = false;

        if (hasDestroy) {
          destroy(result);
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    hasDestroy ? inputs : destroy
  );
}
