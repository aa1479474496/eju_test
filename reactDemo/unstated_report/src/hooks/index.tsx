import { useEffect, RefObject } from 'react';

// interface RefObject<T> {
//   readonly current: T | null;
// }


 export function useOnClickOutSide(ref: RefObject<HTMLElement>, handler: (event:Event) => void) {
  useEffect(
    () => {
      const listener = (event:Event): void => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [ref, handler]
  );
}
