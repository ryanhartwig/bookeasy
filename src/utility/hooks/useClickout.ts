import React, { useCallback, useEffect, useRef } from "react"

// export const useClickout = (
//   onClickout: (...args: any) => void,
//   open: boolean,
//   pause: boolean,
//   ...refs: React.MutableRefObject<any>[]
// ) => {
//   const listenerRef = useRef<boolean>(false);

//   const onClick = useCallback((e:any) => {
//     if (pause) return;
//     if (e && [...refs].some(r => r?.current?.contains(e.target))) return;

//     listenerRef.current = false;
//     window.removeEventListener('click', onClick);

//     onClickout();
//   }, [onClickout, pause, refs]);

//   const removeListener = useCallback(() => {
//     if (pause) return;
    
//     listenerRef.current = false;
//     window.removeEventListener('click', onClick);

//     onClickout();
//   }, [onClick, onClickout, pause]);

//   useEffect(() => {  
//     if (!open) return;
//     if (listenerRef.current) return;
    
//     setTimeout(() => {
//       window.addEventListener('click', onClick);
//       listenerRef.current = true;
//     }, 100);

//   }, [onClick, open]);

//   return removeListener;
// }

export const useClickout = (
  onClickout: (...args: any) => void,
  open: boolean,
  pause: boolean,
  ...refs: React.MutableRefObject<any>[]
) => {
  const listenerRef = useRef<boolean>(false);
  const initialClickRef = useRef<boolean>(false);

  const onClick = useCallback((e:any) => {
    if (pause) return;
    if (e && [...refs].some(r => r?.current?.contains(e.target))) return;

    if (!initialClickRef.current) {
      initialClickRef.current = true;
      return;
    }

    listenerRef.current = false;
    window.removeEventListener('click', onClick);

    onClickout();
  }, [onClickout, pause, refs]);

  const removeListener = useCallback(() => {
    if (pause) return;
    
    listenerRef.current = false;
    window.removeEventListener('click', onClick);

    onClickout();
  }, [onClick, onClickout, pause]);

  useEffect(() => {  
    if (!open) return;
    if (listenerRef.current) return;

    window.addEventListener('click', onClick);
    listenerRef.current = true;

    return () => {
      window.removeEventListener('click', onClick);
      listenerRef.current = false;
      initialClickRef.current = false;
    }
  }, [onClick, open]);

  return removeListener;
}