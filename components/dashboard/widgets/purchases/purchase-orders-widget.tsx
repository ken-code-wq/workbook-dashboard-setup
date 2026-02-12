"use client";

import { Badge } from "@/components/ui/badge";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { purchaseOrders, type PurchaseOrder } from "@/mock-data/purchases";

function StatusBadge({ status }: { status: PurchaseOrder["status"] }) {
  const styles: Record<PurchaseOrder["status"], string> = {
    open: "border-blue-500/30 text-blue-500",
    sent: "border-amber-500/30 text-amber-500",
    received: "border-emerald-500/30 text-emerald-500",
    cancelled: "border-muted text-muted-foreground",
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {status}
    </Badge>
  );
}

const columns: Array<TableWidgetColumn<PurchaseOrder>> = [
  {
    key: "number",
    header: "PO",
    cell: (row) => (
      <div className="min-w-[180px]">
        <p className="text-sm font-medium truncate">{row.number}</p>
        <p className="text-xs text-muted-foreground truncate">{row.vendor}</p>
      </div>
    ),
  },
  {
    key: "date",
    header: "Date",
    cell: (row) => <span className="text-sm text-muted-foreground">{row.date}</span>,
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

export function PurchaseOrdersWidget() {
  return (
    <TableWidget
      title="Purchase Orders"
      description="Open and recent POs"
      rows={purchaseOrders}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
