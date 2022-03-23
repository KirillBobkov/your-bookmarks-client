import { useState, useEffect } from 'react';

export default (value: string, delay: number): string => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
  
    useEffect((): any => {
        const handler = setTimeout((): void => {
          setDebouncedValue(value);
        }, delay);
  
        return (): void => {
          clearTimeout(handler);
        };
      }, [value, delay]);
  
    return debouncedValue;
};
