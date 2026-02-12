"use client";

import { Badge } from "@/components/ui/badge";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { expenses, type Expense } from "@/mock-data/purchases";

function StatusBadge({ status }: { status: Expense["status"] }) {
  const styles: Record<Expense["status"], string> = {
    pending: "border-amber-500/30 text-amber-500",
    approved: "border-blue-500/30 text-blue-500",
    reimbursed: "border-emerald-500/30 text-emerald-500",
    rejected: "border-pink-500/30 text-pink-500",
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {status}
    </Badge>
  );
}

const columns: Array<TableWidgetColumn<Expense>> = [
  {
    key: "description",
    header: "Expense",
    cell: (row) => (
      <div className="min-w-[180px]">
        <p className="text-sm font-medium truncate">{row.description}</p>
        <p className="text-xs text-muted-foreground truncate">{row.category}</p>
      </div>
    ),
  },
  {
    key: "date",
    header: "Date",
    cell: (row) => <span className="text-sm text-muted-foreground">{row.date}</span>,
    className: "w-[100px]",
  },
  {
    key: "submittedBy",
    header: "Submitted By",
    cell: (row) => <span className="text-sm text-muted-foreground truncate">{row.submittedBy}</span>,
    className: "w-[140px]",
  },
  {
    key: "amount",
    header: "Amount",
    cell: (row) => (
      <span className="text-sm font-medium tabular-nums">${row.amount.toLocaleString()}</span>
    ),
    className: "w-[100px]",
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
    className: "w-[110px]",
  },
];

export function ExpensesWidget() {
  return (
    <TableWidget
      title="Expenses"
      description="Employee expense claims"
      rows={expenses}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
