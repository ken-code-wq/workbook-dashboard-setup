"use client";

import { Badge } from "@/components/ui/badge";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { bills, type Bill } from "@/mock-data/purchases";

function StatusBadge({ status }: { status: Bill["status"] }) {
  const styles: Record<Bill["status"], string> = {
    draft: "border-muted text-muted-foreground",
    approved: "border-blue-500/30 text-blue-500",
    paid: "border-emerald-500/30 text-emerald-500",
    overdue: "border-pink-500/30 text-pink-500",
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {status}
    </Badge>
  );
}

const columns: Array<TableWidgetColumn<Bill>> = [
  {
    key: "number",
    header: "Bill",
    cell: (row) => (
      <div className="min-w-[180px]">
        <p className="text-sm font-medium truncate">{row.number}</p>
        <p className="text-xs text-muted-foreground truncate">{row.vendor}</p>
      </div>
    ),
  },
  {
    key: "due",
    header: "Due",
    cell: (row) => <span className="text-sm text-muted-foreground">{row.dueDate}</span>,
    className: "w-[120px]",
  },
  {
    key: "total",
    header: "Total",
    cell: (row) => (
      <span className="text-sm font-medium tabular-nums">${row.total.toLocaleString()}</span>
    ),
    className: "w-[120px]",
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
    className: "w-[120px]",
  },
];

export function BillsWidget() {
  return (
    <TableWidget
      title="Bills"
      description="Vendor bills"
      rows={bills}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
