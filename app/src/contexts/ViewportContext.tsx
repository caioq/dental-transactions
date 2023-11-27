import { ReactNode, createContext, useCallback, useEffect, useState } from "react";

interface ViewportContextType {
  width: number;
  height: number;
  isMobile: boolean;
}

interface ViewportProviderProps {
  children: ReactNode;
}

export const ViewportContext = createContext({} as ViewportContextType);

export function ViewportProvider({ children }: ViewportProviderProps) {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [isMobile, setIsMobile] = useState(isMobileDevice());

  function isMobileDevice() {
    return window.innerWidth < 1120;
  }

  const handleWindowResize = useCallback(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    setIsMobile(isMobileDevice());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  return <ViewportContext.Provider value={{ width, height, isMobile }}>{children}</ViewportContext.Provider>;
}
