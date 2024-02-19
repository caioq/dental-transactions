import { ReactNode, createContext, useCallback, useState } from "react";
import { api, calculateTotalPayment, parseDatetoISODate } from "../utils";

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

export interface Category {
  id: string;
  name: string;
}

export interface Cost {
  id: string;
  date: Date;
  description: string;
  value: number;
  category: Category;
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

interface CreateCostInput {
  date: Date;
  description: string | null;
  categoryId: string;
  value: number;
}

interface UpdateCostInput extends CreateCostInput {
  id: string;
}

interface ProcedureContextType {
  loading: boolean;
  loadingPayments: boolean;
  procedures: Procedure[];
  categories: Category[];
  payments: Payment[];
  costCategories: Category[];
  costs: Cost[];
  fetchProcedures: (startDate?: Date, endDate?: Date) => Promise<void>;
  fetchPayments: (startDate?: Date, endDate?: Date) => Promise<void>;
  // fetchCategories: (query?: string) => Promise<void>;
  fetchCosts: (startDate?: Date, endDate?: Date) => Promise<void>;
  createProcedure: (data: CreateProcedureInput) => Promise<void>;
  updateProcedure: (data: UpdateProcedureInput) => Promise<void>;
  createCost: (data: CreateCostInput) => Promise<void>;
  updateCost: (data: UpdateCostInput) => Promise<void>;
}

interface ProceduresProviderProps {
  children: ReactNode;
  categories: Category[];
  costCategories: Category[];
}

export const ProceduresContext = createContext({} as ProcedureContextType);

export function ProceduresProvider({ children, categories, costCategories }: ProceduresProviderProps) {
  // const { signed } = useAuth();
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  // const [categories, setCategories] = useState<Category[]>(initCategories);
  // const [costCategories, setCostCategories] = useState<Category[]>(initCostCategories);
  const [costs, setCosts] = useState<Cost[]>([]);
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

  // const fetchCategories = useCallback(async () => {
  //   const response = await api.get("categories", {});

  //   setCategories(response.data);
  // }, []);

  // const fetchCostCategories = useCallback(async () => {
  //   const response = await api.get("cost-categories", {});

  //   setCostCategories(response.data);
  // }, []);

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

  const fetchCosts = useCallback(async (startDate?: Date, endDate?: Date) => {
    setLoading(true);

    try {
      const response = await api.get("costs", {
        params: {
          ...(startDate && { start_date: parseDatetoISODate(startDate) }),
          ...(endDate && { end_date: parseDatetoISODate(endDate) }),
        },
      });

      setCosts(response.data);
    } catch (error) {
      alert("Erro ao buscar custos");
      setLoading(false);
    }

    setLoading(false);
  }, []);

  const createCost = useCallback(async (data: CreateCostInput) => {
    const response = await api.post("costs", data);
    const createdCost: Cost = {
      ...response.data,
    };

    setCosts((state) => [createdCost, ...state]);
  }, []);

  const updateCost = useCallback(async (data: UpdateCostInput) => {
    const response = await api.put("costs", data);
    const updateCost: Cost = {
      ...response.data,
    };

    setCosts((state) => state.map((cost) => (cost.id === updateCost.id ? updateCost : cost)));
  }, []);

  return (
    <ProceduresContext.Provider
      value={{
        loading,
        loadingPayments,
        procedures,
        payments,
        categories,
        costCategories,
        costs,
        fetchProcedures,
        fetchPayments,
        // fetchCategories,
        fetchCosts,
        createProcedure,
        updateProcedure,
        createCost,
        updateCost,
      }}
    >
      {children}
    </ProceduresContext.Provider>
  );
}
