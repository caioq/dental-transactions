import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { api, calculateTotalPayment, parseDatetoISODate } from "../utils";
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
  fetchProcedures: (startDate?: Date, endDate?: Date) => Promise<void>;
  fetchPayments: (startDate?: Date, endDate?: Date) => Promise<void>;
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

  const fetchProcedures = useCallback(async (startDate?: Date, endDate?: Date) => {
    setLoading(true);
    try {
      const response = await api.get("procedures", {
        params: {
          ...(startDate && { start_date: parseDatetoISODate(startDate) }),
          ...(endDate && { end_date: parseDatetoISODate(endDate) }),
        },
      });

      const procedures: Procedure[] = response.data.map((item: GetProceduresResponse) => ({
        ...item,
        percentToReceive: item.invoice / item.billing,
        totalPaid: calculateTotalPayment(item.payments || []),
      }));

      setProcedures(procedures);
    } catch (error) {
      alert("Erro ao buscar procedimentos");
      setLoading(false);
    }
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

  const fetchPayments = useCallback(async (startDate?: Date, endDate?: Date) => {
    setLoadingPayments(true);

    try {
      const response = await api.get("payments", {
        params: {
          ...(startDate && { start_date: parseDatetoISODate(startDate) }),
          ...(endDate && { end_date: parseDatetoISODate(endDate) }),
        },
      });

      setPayments(response.data);
    } catch (error) {
      alert("Erro ao buscar pagamentos");
      setLoadingPayments(false);
    }

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
