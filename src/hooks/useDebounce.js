import { useState, useEffect } from "react";

const useDebounce = (changedValue, delayTime) => {
  const [debouncedValue, setDebouncedValue] = useState(changedValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(changedValue);
    }, delayTime);

    return () => clearTimeout(timeoutId);
  }, [changedValue, delayTime]);

  return debouncedValue;
};

export default useDebounce;
