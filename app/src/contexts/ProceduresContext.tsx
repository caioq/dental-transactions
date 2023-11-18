import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { api, calculateTotalPayment } from "../utils";
import { useAuth } from "../hooks";

export interface Procedure {
  id: string;
  date: Date;
  patientName: string;
  billing: number;
  invoice: number;
  percentToReceive: number;
  payments: Payment[];
  totalPaid: number;
  category: Category;
}

export interface Payment {
  id: string;
  date: Date;
  value: number;
}

interface Category {
  id: string;
  name: string;
}

interface GetProceduresResponse {
  id: string;
  patientName?: string | null;
  date: Date;
  categoryId: string;
  billing: number;
  invoice: number;
  cpf?: string | null;
  doctorId: string;
  payment?: number | null;
  payments?: Payment[];
  createdAt: Date;
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
  loading: boolean;
  loadingPayments: boolean;
  procedures: Procedure[];
  categories: Category[];
  payments: Payment[];
  fetchProcedures: (date?: Date) => Promise<void>;
  fetchPayments: (date?: Date) => Promise<void>;
  fetchCategories: (query?: string) => Promise<void>;
  createProcedure: (data: CreateProcedureInput) => Promise<void>;
  updateProcedure: (data: UpdateProcedureInput) => Promise<void>;
}

interface ProceduresProviderProps {
  children: ReactNode;
}

export const ProceduresContext = createContext({} as ProcedureContextType);

export function ProceduresProvider({ children }: ProceduresProviderProps) {
  const { signed } = useAuth();
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingPayments, setLoadingPayments] = useState<boolean>(true);

  const fetchProcedures = useCallback(async (date?: Date) => {
    setLoading(true);
    let monthYear;
    if (date) {
      const today = new Date(date);
      monthYear = `${today.getMonth() + 1}-${today.getFullYear()}`;
    }

    const response = await api.get("procedures", {
      params: {
        month_year: monthYear,
      },
    });

    const procedures: Procedure[] = response.data.map((item: GetProceduresResponse) => ({
      ...item,
      percentToReceive: item.invoice / item.billing,
      totalPaid: calculateTotalPayment(item.payments || []),
    }));

    setProcedures(procedures);
    setLoading(false);
  }, []);

  const createProcedure = useCallback(async (data: CreateProcedureInput) => {
    const response = await api.post("procedures", data);
    const createdProcedure: Procedure = {
      ...response.data,
      percentToReceive: response.data.invoice / response.data.billing,
      totalPaid: calculateTotalPayment(response.data.payments || []),
    };

    setProcedures((state) => [createdProcedure, ...state]);
  }, []);

  const updateProcedure = useCallback(async (data: UpdateProcedureInput) => {
    const response = await api.put("procedures", data);
    const updatedProcedure: Procedure = {
      ...response.data,
      percentToReceive: response.data.invoice / response.data.billing,
      totalPaid: calculateTotalPayment(response.data.payments || []),
    };

    setProcedures((state) =>
      state.map((procedure) => (procedure.id === updatedProcedure.id ? updatedProcedure : procedure))
    );
  }, []);

  const fetchCategories = useCallback(async () => {
    const response = await api.get("categories", {});

    setCategories(response.data);
  }, []);

  const fetchPayments = useCallback(async (date?: Date) => {
    setLoadingPayments(true);
    let monthYear;
    if (date) {
      const today = new Date(date);
      monthYear = `${today.getMonth() + 1}-${today.getFullYear()}`;
    }

    const response = await api.get("payments", {
      params: {
        month_year: monthYear,
      },
    });

    setPayments(response.data);
    setLoadingPayments(false);
  }, []);

  useEffect(() => {
    if (signed) {
      // fetchProcedures();
      fetchCategories();
    }
  }, [signed, fetchCategories]);

  return (
    <ProceduresContext.Provider
      value={{
        loading,
        loadingPayments,
        procedures,
        payments,
        categories,
        fetchProcedures,
        fetchPayments,
        fetchCategories,
        createProcedure,
        updateProcedure,
      }}
    >
      {children}
    </ProceduresContext.Provider>
  );
}
