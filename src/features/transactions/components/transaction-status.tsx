import type { TransactionStatus } from "../types/transaction";

interface TransactionStatusProps {
  status: TransactionStatus;
}

const statusLabels: Record<
  TransactionStatus,
  string
> = {
  completed: "Completed",
  pending: "Pending",
  failed: "Failed",
};

export function TransactionStatusBadge({
  status,
}: TransactionStatusProps) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium">
      {statusLabels[status]}
    </span>
  );
}