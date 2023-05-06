import React, { useCallback, useEffect, useRef } from "react"

interface useClickoutProps {
  onClickout: (...args: any) => void,
  open: boolean,
  pause?: boolean,
  /**
   * If provided, will not perform clickout when a click event happens that is *outside* of this ref
   * 
   * Aka the listener area or outer content box where click events will likely happen. Prevents immediate triggering of
   * the onClickout handler in cases where the click event propagates 
   */
  listenAreaRef?: React.MutableRefObject<any>,
  /**
   * Will not perform clickout when a click event happens that is *inside* any of these refs
   * 
   * Aka the content area(s) where the clickout is not triggered
   */
  contentRefs: React.MutableRefObject<any>[],
}

export const useClickout = (
  onClickout: (...args: any) => void,
  open: boolean,
  pause: boolean,
  modalRef: React.MutableRefObject<any>,
  ...refs: React.MutableRefObject<any>[]
) => {
  const listenerRef = useRef<boolean>(false);
  const initialClickRef = useRef<boolean>(false);

  const onClick = useCallback((e:any) => {
    console.log('in callback: ', e.composedPath());
    console.log('in callback: ', e);

    e.stopPropagation();
    if (!modalRef.current.contains(e.target)) {
      console.log('modal ref not contained');
      return;
    };
    if (pause) return;
    if ([...refs].some(r => r?.current?.contains(e.target))) {
      console.log('content ref not contained');
      return;
    };

    listenerRef.current = false;
    window.removeEventListener('click', onClick);

    onClickout();
  }, [modalRef, onClickout, pause, refs]);

  const forceClickout = useCallback((e?: any) => {
    if (e) e.stopPropagation();

    listenerRef.current = false;
    window.removeEventListener('click', onClick);

    onClickout();
  }, [onClick, onClickout]);

  useEffect(() => {  
    if (!open) return;
    if (listenerRef.current) return;

    window.addEventListener('click', onClick);
    listenerRef.current = true;


    // Keep! Need to reset the refs when unmounting
    return () => {
      window.removeEventListener('click', onClick);
      listenerRef.current = false;
      initialClickRef.current = false;
    }
  }, [onClick, open]);

  return forceClickout;
}