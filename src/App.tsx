import { useSetState } from '../lib/hooks/useSetState';

interface FormState {
  name: string;
  age: number;
}

function App() {
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

export default App;