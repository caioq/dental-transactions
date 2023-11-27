import { useContext } from "react";
import { ViewportContext } from "../contexts/ViewportContext";

export function useViewport() {
  const context = useContext(ViewportContext);

  return context;
}
