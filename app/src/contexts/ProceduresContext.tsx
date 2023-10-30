import { ReactNode, createContext, useCallback, useState } from "react";
import { api } from "../utils";

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
  id: string;
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
  payments: {
    date: Date;
    value: number;
  }[];
}

interface UpdateProcedureInput extends CreateProcedureInput {
  id: string;
  payments: {
    id?: string;
    date: Date;
    value: number;
  }[];
}

interface ProcedureContextType {
  procedures: Procedure[];
  categories: Category[];
  fetchProcedures: (query?: string) => Promise<void>;
  fetchCategories: (query?: string) => Promise<void>;
  createProcedure: (data: CreateProcedureInput) => Promise<void>;
  updateProcedure: (data: UpdateProcedureInput) => Promise<void>;
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
    const createdProcedure: Procedure = {
      ...response.data,
    };

    setProcedures((state) => [createdProcedure, ...state]);
  }, []);

  const updateProcedure = useCallback(async (data: UpdateProcedureInput) => {
    const response = await api.put("procedures", data);
    const updatedProcedure: Procedure = {
      ...response.data,
    };

    setProcedures((state) =>
      state.map((procedure) => (procedure.id === updatedProcedure.id ? updatedProcedure : procedure))
    );
  }, []);

  const fetchCategories = useCallback(async () => {
    const response = await api.get("categories", {});

    setCategories(response.data);
  }, []);

  // useEffect(() => {
  //   fetchProcedures();
  //   fetchCategories();
  // }, [fetchProcedures, fetchCategories]);

  return (
    <ProceduresContext.Provider
      value={{
        procedures,
        categories,
        fetchProcedures,
        fetchCategories,
        createProcedure,
        updateProcedure,
      }}
    >
      {children}
    </ProceduresContext.Provider>
  );
}
