import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { api } from "../utils/api";

export interface Procedure {
  id: string;
  date: Date;
  patientName: string;
  billing: number;
  invoice: number;
  percentToReceive: number;
  payments: Payment[];
  category: Category;
}

interface Payment {
  date: Date;
  value: number;
}

interface Category {
  id: string;
  name: string;
}

interface CreateProcedureInput {
  date: Date;
  patientName: string | null;
  cpf: string | null;
  categoryId: string;
  billing: number;
  invoice: number;
  payments: Payment[];
}

interface ProcedureContextType {
  procedures: Procedure[];
  categories: Category[];
  fetchProcedures: (query?: string) => Promise<void>;
  createProcedure: (data: CreateProcedureInput) => Promise<void>;
}

interface ProceduresProviderProps {
  children: ReactNode;
}

export const ProceduresContext = createContext({} as ProcedureContextType);

export function ProceduresProvider({ children }: ProceduresProviderProps) {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

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

  const createProcedure = useCallback(async (data: CreateProcedureInput) => {
    const response = await api.post("procedures", data);

    setProcedures((state) => [response.data, ...state]);
  }, []);

  const fetchCategories = useCallback(async () => {
    const response = await api.get("categories", {});

    setCategories(response.data);
  }, []);

  useEffect(() => {
    fetchProcedures();
    fetchCategories();
  }, [fetchProcedures, fetchCategories]);

  return (
    <ProceduresContext.Provider
      value={{
        procedures,
        categories,
        fetchProcedures,
        createProcedure,
      }}
    >
      {children}
    </ProceduresContext.Provider>
  );
}
