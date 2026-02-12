"use client";

import { Badge } from "@/components/ui/badge";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { chartOfAccounts, type ChartOfAccount } from "@/mock-data/accounting";

function TypeBadge({ type }: { type: ChartOfAccount["type"] }) {
  const map: Record<ChartOfAccount["type"], string> = {
    asset: "border-blue-500/30 text-blue-500",
    liability: "border-amber-500/30 text-amber-500",
    equity: "border-violet-500/30 text-violet-500",
    income: "border-emerald-500/30 text-emerald-500",
    expense: "border-pink-500/30 text-pink-500",
  };

  return (
    <Badge variant="outline" className={map[type]}>
      {type}
    </Badge>
  );
}

function StatusBadge({ status }: { status: ChartOfAccount["status"] }) {
  return status === "active" ? (
    <Badge variant="outline" className="border-emerald-500/30 text-emerald-500">
      Active
    </Badge>
  ) : (
    <Badge variant="outline" className="border-muted text-muted-foreground">
      Archived
    </Badge>
  );
}

const columns: Array<TableWidgetColumn<ChartOfAccount>> = [
  {
    key: "code",
    header: "Code",
    cell: (row) => <span className="text-sm font-mono">{row.code}</span>,
    className: "w-[90px]",
  },
  {
    key: "name",
    header: "Account",
    cell: (row) => (
      <div className="min-w-[220px]">
        <p className="text-sm font-medium truncate">{row.name}</p>
      </div>
    ),
  },
  {
    key: "type",
    header: "Type",
    cell: (row) => <TypeBadge type={row.type} />,
    className: "w-[120px]",
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
    className: "w-[120px]",
  },
];

export function ChartOfAccountsWidget() {
  return (
    <TableWidget
      title="Chart of Accounts"
      description="Accounts and types"
      rows={chartOfAccounts}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
