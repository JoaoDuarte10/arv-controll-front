import { useEffect } from 'react';
import { RoutesApp } from './RoutesApp';

export function App() {
  useEffect(() => {
    document.body.style.backgroundColor = '#f8f8ff';
  }, []);

  return <RoutesApp />;
}
