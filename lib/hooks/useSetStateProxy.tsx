import { useMemo } from "react";
import { SetStateHook } from "../models/SetStateHook";
import { useSetState } from "./useSetState";

export function useSetStateProxy<T extends object>(
  initialState: T,
  hook: SetStateHook<T> = useSetState
) {
  // Call the provided hook
  const [state, setState] = hook(initialState);

  // Create a Proxy to intercept property reads and writes
  const proxy = useMemo(
    () =>
      new Proxy(state, {
        get(target, property, receiver) {
          // Read properties directly from the state
          return Reflect.get(target, property, receiver);
        },
        set(_target, property, value) {
          // Write properties by calling setState with a partial update
          if (typeof property === 'string' || typeof property === 'symbol') {
            setState({ [property]: value } as Partial<T>);
            return true;
          }
          return false; // Invalid property type
        },
      }),
    [state, setState]
  );

  return proxy;
}