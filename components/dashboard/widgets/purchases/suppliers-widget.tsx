"use client";

import { Badge } from "@/components/ui/badge";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { suppliers, type Supplier } from "@/mock-data/purchases";

const columns: Array<TableWidgetColumn<Supplier>> = [
  {
    key: "name",
    header: "Supplier",
    cell: (row) => (
      <div className="min-w-[180px]">
        <p className="text-sm font-medium truncate">{row.name}</p>
        <p className="text-xs text-muted-foreground truncate">{row.email}</p>
      </div>
    ),
  },
  {
    key: "phone",
    header: "Phone",
    cell: (row) => <span className="text-sm text-muted-foreground">{row.phone}</span>,
    className: "w-[150px]",
  },
  {
    key: "totalPurchased",
    header: "Total Purchased",
    cell: (row) => (
      <span className="text-sm font-medium tabular-nums">${row.totalPurchased.toLocaleString()}</span>
    ),
    className: "w-[130px]",
  },
  {
    key: "bills",
    header: "Bills",
    cell: (row) => <span className="text-sm tabular-nums text-muted-foreground">{row.billCount}</span>,
    className: "w-[80px]",
  },
  {
    key: "status",
    header: "Status",
    cell: (row) =>
      row.status === "active" ? (
        <Badge variant="outline" className="border-emerald-500/30 text-emerald-500">active</Badge>
      ) : (
        <Badge variant="outline" className="border-muted text-muted-foreground">inactive</Badge>
      ),
    className: "w-[100px]",
  },
];

export function SuppliersWidget() {
  return (
    <TableWidget
      title="Suppliers"
      description="Vendor directory"
      rows={suppliers}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
