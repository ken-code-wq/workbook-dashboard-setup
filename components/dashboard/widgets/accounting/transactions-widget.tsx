"use client";

import { Badge } from "@/components/ui/badge";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { transactions, type Transaction } from "@/mock-data/accounting";

function TypeBadge({ type }: { type: Transaction["type"] }) {
  const styles: Record<Transaction["type"], string> = {
    invoice: "border-blue-500/30 text-blue-500",
    payment: "border-emerald-500/30 text-emerald-500",
    bill: "border-amber-500/30 text-amber-500",
    expense: "border-pink-500/30 text-pink-500",
    journal: "border-violet-500/30 text-violet-500",
    transfer: "border-cyan-500/30 text-cyan-500",
  };

  return (
    <Badge variant="outline" className={styles[type]}>
      {type}
    </Badge>
  );
}

const columns: Array<TableWidgetColumn<Transaction>> = [
  {
    key: "date",
    header: "Date",
    cell: (row) => <span className="text-sm text-muted-foreground">{row.date}</span>,
    className: "w-[100px]",
  },
  {
    key: "reference",
    header: "Ref",
    cell: (row) => <span className="text-sm font-mono">{row.reference}</span>,
    className: "w-[120px]",
  },
  {
    key: "description",
    header: "Description",
    cell: (row) => (
      <div className="min-w-[200px]">
        <p className="text-sm font-medium truncate">{row.description}</p>
        <p className="text-xs text-muted-foreground truncate">{row.account}</p>
      </div>
    ),
  },
  {
    key: "type",
    header: "Type",
    cell: (row) => <TypeBadge type={row.type} />,
    className: "w-[100px]",
  },
  {
    key: "debit",
    header: "Debit",
    cell: (row) => (
      <span className="text-sm tabular-nums text-muted-foreground">
        {row.debit > 0 ? `$${row.debit.toLocaleString()}` : "–"}
      </span>
    ),
    className: "w-[100px]",
  },
  {
    key: "credit",
    header: "Credit",
    cell: (row) => (
      <span className="text-sm tabular-nums text-muted-foreground">
        {row.credit > 0 ? `$${row.credit.toLocaleString()}` : "–"}
      </span>
    ),
    className: "w-[100px]",
  },
];

export function TransactionsWidget() {
  return (
    <TableWidget
      title="Transactions"
      description="General ledger entries"
      rows={transactions}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
