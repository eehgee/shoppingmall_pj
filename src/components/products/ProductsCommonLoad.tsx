import { useState, useEffect } from "react";

function useCommonLoading(delay = 2000) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return loading;
}

export default useCommonLoading;
