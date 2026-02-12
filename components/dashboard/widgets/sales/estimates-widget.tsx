"use client";

import { Badge } from "@/components/ui/badge";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { estimates, type Estimate } from "@/mock-data/sales";

function StatusBadge({ status }: { status: Estimate["status"] }) {
  const styles: Record<Estimate["status"], string> = {
    draft: "border-muted text-muted-foreground",
    sent: "border-blue-500/30 text-blue-500",
    accepted: "border-emerald-500/30 text-emerald-500",
    declined: "border-pink-500/30 text-pink-500",
    expired: "border-amber-500/30 text-amber-500",
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {status}
    </Badge>
  );
}

const columns: Array<TableWidgetColumn<Estimate>> = [
  {
    key: "number",
    header: "Estimate",
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
    key: "expiry",
    header: "Expires",
    cell: (row) => <span className="text-sm text-muted-foreground">{row.expiryDate}</span>,
    className: "w-[110px]",
  },
  {
    key: "total",
    header: "Amount",
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

export function EstimatesWidget() {
  return (
    <TableWidget
      title="Estimates"
      description="Quotes and proposals"
      rows={estimates}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
