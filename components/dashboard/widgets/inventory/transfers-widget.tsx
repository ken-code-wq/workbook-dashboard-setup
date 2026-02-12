"use client";

import { Badge } from "@/components/ui/badge";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { stockTransfers, type StockTransfer } from "@/mock-data/inventory";

function StatusBadge({ status }: { status: StockTransfer["status"] }) {
  const styles: Record<StockTransfer["status"], string> = {
    pending: "border-amber-500/30 text-amber-500",
    "in-transit": "border-blue-500/30 text-blue-500",
    completed: "border-emerald-500/30 text-emerald-500",
    cancelled: "border-pink-500/30 text-pink-500",
  };

  const labels: Record<StockTransfer["status"], string> = {
    pending: "Pending",
    "in-transit": "In Transit",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {labels[status]}
    </Badge>
  );
}

const columns: Array<TableWidgetColumn<StockTransfer>> = [
  {
    key: "date",
    header: "Date",
    cell: (row) => <span className="text-sm text-muted-foreground">{row.date}</span>,
    className: "w-[100px]",
  },
  {
    key: "item",
    header: "Item",
    cell: (row) => (
      <div className="min-w-[170px]">
        <p className="text-sm font-medium truncate">{row.itemName}</p>
        <p className="text-xs text-muted-foreground truncate">{row.sku}</p>
      </div>
    ),
  },
  {
    key: "from",
    header: "From",
    cell: (row) => <span className="text-sm font-mono">{row.fromLocation}</span>,
    className: "w-[80px]",
  },
  {
    key: "to",
    header: "To",
    cell: (row) => <span className="text-sm font-mono">{row.toLocation}</span>,
    className: "w-[80px]",
  },
  {
    key: "quantity",
    header: "Qty",
    cell: (row) => <span className="text-sm tabular-nums">{row.quantity}</span>,
    className: "w-[70px]",
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
    className: "w-[110px]",
  },
];

export function TransfersWidget() {
  return (
    <TableWidget
      title="Stock Transfers"
      description="Inter-location movements"
      rows={stockTransfers}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
