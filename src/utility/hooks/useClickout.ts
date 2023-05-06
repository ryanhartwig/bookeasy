import React, { useCallback, useEffect, useRef, useState } from "react"

interface useClickoutProps {
  onClickout: (...args: any) => void,
  enabled: boolean,
  pause?: boolean,
  /**
   * Will not perform clickout when a click event happens that is inside any of these refs
   */
  contentRefs: React.MutableRefObject<any>[],
}

/** 
 * Triggers onClickout() when a click event occurs out of specified area
 * @returns forceClickout() function that can be invoked to trigger the clickout
 */
export const useClickout = ({onClickout, enabled, pause, contentRefs}: useClickoutProps) => {

  // Required; dodges initial click propagation which would trigger onClick -> onClickout() immediately after mounting
  const [enableListener, setEnableListener] = useState<boolean>(false);
  useEffect(() => setEnableListener(!!enabled), [enabled]);
  //
  
  const onClick = useCallback((e:any) => {
    e.stopPropagation();
    if (pause) return;
    if ([...contentRefs].some(r => r?.current?.contains(e.target))) return;

    window.removeEventListener('click', onClick);
    onClickout();
  }, [contentRefs, onClickout, pause]);

  const forceClickout = useCallback((e?: any) => {
    if (e) e.stopPropagation();
    window.removeEventListener('click', onClick);

    onClickout();
  }, [onClick, onClickout]);

  useEffect(() => {  
    if (!enableListener) return;
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    }
  }, [enableListener, onClick]);

  return forceClickout;
}