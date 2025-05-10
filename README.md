# React state management hooks

A pair of React hooks (`useSetState` and `useSetStateRef`) that mimic class component `setState` with immutable UI-driven updates and synchronous logic-driven state management.

## Installation

Install via npm:

```bash
npm install @mesmotronic/react-usesetstate
```

## Features

- **`useSetState`**: Immutable state management with automatic re-rendering, ideal for UI components.
- **`useSetStateRef`**: Synchronous state updates without re-rendering, perfect for logic or non-UI state.
- TypeScript support with type-safe state updates.
- Mimics React class component `setState` behaviour (merges partial updates, supports functional updates).

## Usage

### 1. `useSetState`

A hook for UI-driven state management with immutable updates and re-rendering.

```tsx
import { useSetState } from "@mesmotronic/react-usesetstate";

interface FormState {
  name: string;
  age: number;
}

function FormComponent() {
  const [state, setState] = useSetState<FormState>({ name: "", age: 0 });

  return (
    <div>
      <input value={state.name} onChange={(e) => setState({ name: e.target.value })} />
      <button onClick={() => setState((prev) => ({ age: prev.age + 1 }))}>Increment Age</button>
      <p>
        Name: {state.name}, Age: {state.age}
      </p>
    </div>
  );
}
```

### 2. `useSetStateRef`

A hook for synchronous state updates without re-rendering, ideal for logic or form validation.

```tsx
import { useSetStateRef } from "@mesmotronic/react-usesetstate";

interface FormState {
  name: string;
  age: number;
}

function LogicComponent() {
  const [state, setState] = useSetStateRef<FormState>({ name: "", age: 0 });

  const handleUpdate = () => {
    setState({ name: "Alice" });
    console.log(state.name); // 'Alice' (instantly)
    state.age = 30; // Direct mutation
    console.log(state.age); // 30
  };

  return <button onClick={handleUpdate}>Update State</button>;
}
```

## API

- **`useSetState<T extends object>(initialState: T)`**:
  - Returns: `[state: T, setState: (newState: Partial<T> | ((prev: T) => Partial<T>)) => void]`
  - Updates state immutably, triggers re-renders.
- **`useSetStateRef<T extends object>(initialState: T)`**:
  - Returns: `[state: T, setState: (newState: Partial<T> | ((prev: T) => Partial<T>)) => void]`
  - Updates state synchronously, no re-renders.

## Notes

- `useSetState` is best for UI components where state changes should update the DOM.
- `useSetStateRef` is suited for logic-driven state (e.g., form data before submission) but requires manual re-rendering for UI updates.
- Both hooks support TypeScript for type-safe state management.

## Licence

BSD 3-Clause
