import { useState } from 'react';

// initial mode setup
export default function useVisualMode(initial) {
/*   const [mode, setMode] = useState(initial); */
  const [history, setHistory] = useState([initial]);


// transition to a new mode
  function transition(mode, replace = false) {
  /*   setMode((prev) => mode); */
    setHistory((prev) => replace ? [...prev.slice(0, -1), mode] : [...history, mode]);
  };

  // functionality to call back to the previous mode
  function back() {
    setHistory((prev) => prev.length > 1 ? prev.slice(0, -1) : prev)
/*     setMode((prev) => [...history].pop(mode));
  
    if (history.length > 1) {
      setMode((prev) => [...prev].pop(mode));
    } */
  };

  return { mode: history[history.length -1], transition, back };
}


