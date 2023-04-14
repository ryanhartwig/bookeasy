import { useEffect, useRef } from "react";

/**
 * Resets state of subsequent state when a state value changes, based on the order of inputs
 */
export const useWaterfall = (state: [any, React.Dispatch<React.SetStateAction<any>>][], resetValue: any = undefined) => {

  const states = state.map(([state]) => state);
  const setters = state.map(([_, setter]) => setter);
  const refs = useRef<any[]>(states);

  useEffect(() => {
    
    for (let i = 0; i < states.length; i++) {
      if (refs.current[i] !== states[i]) {
        setters.slice(i + 1).forEach(setter => setter(resetValue));

        for (let j = 0; j < states.length; j++) {
          refs.current[j] = j <= i ? states[j] : undefined;
        }

        break;
      }
    }
  }, [resetValue, setters, state, states]);
}