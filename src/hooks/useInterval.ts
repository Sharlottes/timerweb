import React from 'react';

function useInterval(callback: Function, delay: number) {
  const savedCallback = React.useRef<Function>();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current?.call(null), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;