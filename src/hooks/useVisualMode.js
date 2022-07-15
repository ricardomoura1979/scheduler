import { useState } from 'react';

// initial mode setup
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  return { mode };
}
