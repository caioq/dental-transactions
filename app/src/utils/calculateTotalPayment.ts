import { Payment } from "../contexts/ProceduresContext";

export function calculateTotalPayment(payments: Payment[]) {
  return payments?.reduce((acc: number, payment: Payment) => acc + payment.value, 0) || 0;
}
