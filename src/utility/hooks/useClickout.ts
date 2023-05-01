import React, { useCallback, useEffect, useRef } from "react"

export const useClickout = (
  onClickout: (...args: any) => void,
  open: boolean,
  pause: boolean,
  ...refs: React.MutableRefObject<any>[]
) => {
  const listenerRef = useRef<boolean>(false);

  const onClick = useCallback((e:any) => {
    if (pause) return;
    if ([...refs].some(r => r?.current?.contains(e?.target))) return;

    onClickout();
    listenerRef.current = false;
    window.removeEventListener('click', onClick);
  }, [onClickout, pause, refs]);

  useEffect(() => {  
    if (!open) return;
    if (listenerRef.current) return;
    
    setTimeout(() => {
      window.addEventListener('click', onClick);
      listenerRef.current = true;
    }, 100);

  }, [onClick, open]);

  return onClick;
}