import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { api } from "../utils/api";

interface Procedure {
  patientName: string;
  value: number;
  toReceiveValue: number;
  percentToReceive: number;
  paidValue: number;
  category: string;
  createdAt: string;
}

// interface CreateProcedureInput {
//   patientName: string;
//   value: number;
//   toReceiveValue: number;
//   paidValue: number;
//   category: string;
//   createdAt: Date;
// }

interface ProcedureContextType {
  procedures: Procedure[];
  fetchProcedures: (query?: string) => Promise<void>;
}

interface ProceduresProviderProps {
  children: ReactNode;
}

export const ProceduresContext = createContext({} as ProcedureContextType);

export function ProceduresProvider({ children }: ProceduresProviderProps) {
  const [procedures, setProcedures] = useState<Procedure[]>([]);

  const fetchProcedures = useCallback(async (query?: string) => {
    const response = await api.get("procedures", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });

    setProcedures(response.data);
  }, []);

  // const createProcedure = useCallback(async (data: CreateProcedureInput) => {

  //   setProcedures((state) => [response.data, ...state]);
  // }, []);

  useEffect(() => {
    fetchProcedures();
  }, [fetchProcedures]);

  return (
    <ProceduresContext.Provider
      value={{
        procedures,
        fetchProcedures,
      }}
    >
      {children}
    </ProceduresContext.Provider>
  );
}
