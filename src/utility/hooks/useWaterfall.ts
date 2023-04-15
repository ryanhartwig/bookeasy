import { useEffect, useRef } from "react";

/**
 * Resets state of subsequent state chunks when a parent state value changes, based on the order of inputs
 */
export const useWaterfall = (state: [any, React.Dispatch<React.SetStateAction<any>>][][], resetValue: any = undefined) => {

  const refs = useRef<[any, React.Dispatch<React.SetStateAction<any>>][][]>(state);

  useEffect(() => {
    for (let i = 0; i < state.length; i++) {
      if (refs.current[i].some(([val], subind) => val !== state[i][subind][0])) {
        state.slice(i + 1).forEach(group => group.forEach(([_, setter]) => setter(undefined)));

        for (let j = 0; j < state.length; j++) {
          refs.current[j] = j <= i ? state[j] : state[j].map(([_, dispatch]) => [undefined, dispatch]);
        }
        break;
      }
    }
  }, [state]);
}