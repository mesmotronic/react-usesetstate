import { useCallback, useState } from 'react';

/**
 * Immutable state management with automatic re-rendering, ideal for UI components
 */
export function useSetState<T extends object>(initialState: T) {
  const [state, _setState] = useState<T>(initialState);
  const setState = useCallback((newState: Partial<T> | ((prevState: T) => Partial<T>)) => {
    _setState((prevState: T) => {
      const stateUpdate = typeof newState === 'function' ? newState(prevState) : newState;
      return { ...prevState, ...stateUpdate };
    });
  }, []);

  return [state, setState] as const;
}