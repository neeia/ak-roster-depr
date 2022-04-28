import { useState, useEffect } from "react";

export interface Size {
  width: number;
  height: number;
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<Partial<Size>>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize as Size;
}

export default useWindowSize;