"use client";

import { Badge } from "@/components/ui/badge";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { orders, type Order } from "@/mock-data/sales";

function StatusBadge({ status }: { status: Order["status"] }) {
  const styles: Record<Order["status"], string> = {
    pending: "border-amber-500/30 text-amber-500",
    confirmed: "border-blue-500/30 text-blue-500",
    shipped: "border-violet-500/30 text-violet-500",
    delivered: "border-emerald-500/30 text-emerald-500",
    cancelled: "border-pink-500/30 text-pink-500",
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {status}
    </Badge>
  );
}

const columns: Array<TableWidgetColumn<Order>> = [
  {
    key: "number",
    header: "Order",
    cell: (row) => (
      <div className="min-w-[180px]">
        <p className="text-sm font-medium truncate">{row.number}</p>
        <p className="text-xs text-muted-foreground truncate">{row.customer}</p>
      </div>
    ),
  },
  {
    key: "date",
    header: "Date",
    cell: (row) => <span className="text-sm text-muted-foreground">{row.date}</span>,
    className: "w-[110px]",
  },
  {
    key: "items",
    header: "Items",
    cell: (row) => <span className="text-sm tabular-nums text-muted-foreground">{row.items}</span>,
    className: "w-[80px]",
  },
  {
    key: "total",
    header: "Total",
    cell: (row) => (
      <span className="text-sm font-medium tabular-nums">${row.total.toLocaleString()}</span>
    ),
    className: "w-[110px]",
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
    className: "w-[110px]",
  },
];

export function OrdersWidget() {
  return (
    <TableWidget
      title="Orders"
      description="Customer orders"
      rows={orders}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
