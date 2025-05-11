import { useRef } from 'react';
import { SetStateHook } from '../models/SetStateHook';

/**
 * Synchronous state updates without re-rendering, perfect for logic or non-UI state
 */
export function useSetStateRef<T extends object>(initialState: T): ReturnType<SetStateHook<T>> {
  const stateRef = useRef<T>(initialState);
  const setState = (newState: Partial<T> | ((prevState: T) => Partial<T>)) => {
    const stateUpdate = typeof newState === 'function' ? newState(stateRef.current) : newState;
    Object.assign(stateRef.current, stateUpdate);
  };

  return [stateRef.current, setState] as const;
}