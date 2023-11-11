import { useState, useCallback, useLayoutEffect } from 'react';

export default function useWindowDimensions() {
  const hasWindow = typeof window !== 'undefined';

  const getWindowDimensions = useCallback(() => {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;

    return {
      width,
      height
    };
  }, [hasWindow]);

  const [windowDimesionse, setWindowDimensions] = useState(getWindowDimensions());

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    }

    hasWindow && window.addEventListener('resize', handleResize);

    return () => {
      hasWindow && window.removeEventListener('resize', handleResize);
    };
  }, [getWindowDimensions, hasWindow]);

  return windowDimesionse;
}
