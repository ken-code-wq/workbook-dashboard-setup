"use client";

import { Badge } from "@/components/ui/badge";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { creditNotes, type CreditNote } from "@/mock-data/sales";

function StatusBadge({ status }: { status: CreditNote["status"] }) {
  const styles: Record<CreditNote["status"], string> = {
    draft: "border-muted text-muted-foreground",
    issued: "border-blue-500/30 text-blue-500",
    applied: "border-emerald-500/30 text-emerald-500",
    void: "border-pink-500/30 text-pink-500",
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {status}
    </Badge>
  );
}

const columns: Array<TableWidgetColumn<CreditNote>> = [
  {
    key: "number",
    header: "Credit Note",
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
    className: "w-[120px]",
  },
  {
    key: "total",
    header: "Amount",
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

export function CreditNotesWidget() {
  return (
    <TableWidget
      title="Credit Notes"
      description="Issued credit notes"
      rows={creditNotes}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
