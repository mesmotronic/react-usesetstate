
/**
 * Type for the state hook functions
 */
export type SetStateHook<T extends object> = (initialState: T) => readonly [T, (newState: Partial<T> | ((prevState: T) => Partial<T>)) => void];