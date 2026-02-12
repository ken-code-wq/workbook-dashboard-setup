"use client";

import { Badge } from "@/components/ui/badge";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { customers, type Customer } from "@/mock-data/sales";

const columns: Array<TableWidgetColumn<Customer>> = [
  {
    key: "name",
    header: "Customer",
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
    className: "w-[140px]",
  },
  {
    key: "totalSpent",
    header: "Total Spent",
    cell: (row) => (
      <span className="text-sm font-medium tabular-nums">${row.totalSpent.toLocaleString()}</span>
    ),
    className: "w-[120px]",
  },
  {
    key: "invoices",
    header: "Invoices",
    cell: (row) => <span className="text-sm tabular-nums text-muted-foreground">{row.invoiceCount}</span>,
    className: "w-[90px]",
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

export function CustomersWidget() {
  return (
    <TableWidget
      title="Customers"
      description="Customer directory"
      rows={customers}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
