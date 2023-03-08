import { useState, useRef, useCallback, useEffect, MutableRefObject } from "react";
import { useDebouncedCallback } from "use-debounce";

/** Optimizes element resizing by using debounce to await resize finish before applying width to an element 
 * 
 * @param wrapperRef HTML element ref to resize
 * @param targetWidth (optional) Width to apply after resize- defaults to 100%
 * @returns Debounced width at & after resizing window
 */
export const useOptimizedResize = (wrapperRef: MutableRefObject<any>, targetWidth: string = '100%') => {
  const [wrapperWidth, setWrapperWidth] = useState<string>('100%');
  const target = targetWidth ?? '100%';

  const pauseResize = useCallback(() => {
    if (wrapperWidth !== target) return;
    setWrapperWidth(`${wrapperRef.current.offsetWidth}px`);
  }, [target, wrapperRef, wrapperWidth]);

  const widen = useDebouncedCallback(() => {
    setWrapperWidth(target);
  }, 200);

  useEffect(() => {
    window.addEventListener('resize', widen);
    window.addEventListener('resize', pauseResize);

    return () => {
      window.removeEventListener('resize', widen);
      window.removeEventListener('resize', pauseResize);
    }

  }, [pauseResize, widen]);

  return wrapperWidth;
}