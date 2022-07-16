import { useState } from 'react';

// initial mode setup
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);



  function transition(mode, replace = false) {
    setMode((prev) => mode);
    setHistory((prev) => replace ? [...history, mode] : [...history, mode]);
  };

  function back() {
    setHistory((prev) => [...prev].pop(mode));
    if (history.length > 1) {
      setMode((prev) => [...prev].pop(mode));
    }
  };

  return { mode, transition, back };
}


