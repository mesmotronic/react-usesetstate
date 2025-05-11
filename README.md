# State hooks for React

A collection of React hooks (`useSetState`, `useSetStateRef`, `useSetStateProxy`) that mimic class component `setState` for immutable UI-driven updates, synchronous logic-driven state, and proxy-based state access.

## Installation

```bash
npm install @mesmotronic/react-usesetstate
```

## Examples

### `useSetState`

Immutable state with re-rendering for UI components.

```tsx
import { useSetState } from '@mesmotronic/react-usesetstate';

interface FormState {
  name: string;
  age: number;
}

function Form() {
  const [state, setState] = useSetState<FormState>({ name: '', age: 0 });

  return (
    <div>
      <input
        value={state.name}
        onChange={(e) => setState({ name: e.target.value })}
      />
      <button onClick={() => setState((prev) => ({ age: prev.age + 1 }))}>
        Increment Age
      </button>
      <p>Name: {state.name}, Age: {state.age}</p>
    </div>
  );
}
```

### `useSetStateRef`

Synchronous state updates without re-rendering for logic.

```tsx
import { useSetStateRef } from '@mesmotronic/react-usesetstate';

interface FormState {
  name: string;
  age: number;
}

function Logic() {
  const [state, setState] = useSetStateRef<FormState>({ name: '', age: 0 });

  const update = () => {
    setState({ name: 'Alice' });
    console.log(state.name); // 'Alice' (instantly)
    state.age = 30; // Direct mutation
    console.log(state.age); // 30
  };

  return <button onClick={update}>Update</button>;
}
```

### `useSetStateProxy`

Proxy-based state access, using `useSetState` or `useSetStateRef`.

```tsx
import { useSetStateProxy, useSetStateRef } from '@mesmotronic/react-usesetstate';

interface FormState {
  name: string;
  age: number;
}

function Form() {
  const state = useSetStateProxy<FormState>({ name: '', age: 0 }); // Defaults to useSetState
  const logicState = useSetStateProxy<FormState>({ name: '', age: 0 }, useSetStateRef);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.name = e.target.value; // Updates UI
    logicState.name = e.target.value; // Updates synchronously
    console.log('UI:', state.name, 'Logic:', logicState.name);
  };

  return (
    <div>
      <input type="text" value={state.name} onChange={handleChange} />
      <p>Name: {state.name}</p>
    </div>
  );
}
```

## Licence

BSD 3-Clause