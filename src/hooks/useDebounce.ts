import { useState, useEffect } from 'react';

type EffectCallback = void | (() => void | undefined);

export default (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect((): EffectCallback => {
    const handler = setTimeout((): void => {
      setDebouncedValue(value);
    }, delay);
  
    return (): void => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
};
