"use client";

import { Badge } from "@/components/ui/badge";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { invoices, type Invoice } from "@/mock-data/sales-documents";

function StatusBadge({ status }: { status: Invoice["status"] }) {
  const styles: Record<Invoice["status"], string> = {
    draft: "border-muted text-muted-foreground",
    sent: "border-blue-500/30 text-blue-500",
    paid: "border-emerald-500/30 text-emerald-500",
    overdue: "border-pink-500/30 text-pink-500",
    void: "border-amber-500/30 text-amber-500",
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {status}
    </Badge>
  );
}

const columns: Array<TableWidgetColumn<Invoice>> = [
  {
    key: "number",
    header: "Invoice",
    cell: (row) => (
      <div className="min-w-[160px]">
        <p className="text-sm font-medium truncate">{row.number}</p>
        <p className="text-xs text-muted-foreground truncate">{row.customer}</p>
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

export function InvoicesWidget() {
  return (
    <TableWidget
      title="Invoices"
      description="Recent invoices"
      rows={invoices}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
