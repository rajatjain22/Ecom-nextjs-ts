import { useEffect, useCallback } from 'react';

function useOnClickOutside(refs: React.RefObject<HTMLElement>[], handler: () => void) {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      const isOutside = refs.every(ref => ref.current && !ref.current.contains(event.target as Node));
      if (isOutside) {
        handler();
      }
    },
    [refs, handler]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);
}

export default useOnClickOutside;
