import { useEffect, useRef } from 'react';

export const useOutsideClick = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    
    const handleClickOutside = (event) => {
      const isIgnored = event.target.closest('.ignore_outside_click') !== null;

      if (ref.current && !ref.current.contains(event.target)) {
        if (!isIgnored) {
          callback();
        }
      }
    };

    document.addEventListener('click', handleClickOutside);


    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [callback, ref]);

  return ref;
};
