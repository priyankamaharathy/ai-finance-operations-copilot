export type TransactionStatus =
  | "completed"
  | "pending"
  | "failed";

export type TransactionType =
  | "expense"
  | "income";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  vendor: string;
  category: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  paymentMethod: string;
}

export interface TransactionFilters {
  search?: string;
  status?: TransactionStatus | "all";
  category?: string | "all";
}

export interface TransactionResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}