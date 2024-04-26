import { useEffect, useRef } from 'react';

function useClickedClose(close, capturing = true) {
  // always put null in useRef , some stupid warning is coming
  const ref = useRef(null);
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    }
    // the third prop is make event listener just take place in capturing phase not go through the bubbling phase
    document.addEventListener('click', handleClick, capturing);
    return () => document.removeEventListener('click', handleClick, capturing);
  }, [close, capturing]);
  return ref;
}

export default useClickedClose;
