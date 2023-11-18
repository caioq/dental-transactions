import { useContext } from "react";
import { ProceduresContext } from "../contexts/ProceduresContext";

export function useProcedure() {
  const context = useContext(ProceduresContext);

  return context;
}
