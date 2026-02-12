"use client";

import { Badge } from "@/components/ui/badge";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { fixedAssets, type FixedAsset } from "@/mock-data/accounting";

function StatusBadge({ status }: { status: FixedAsset["status"] }) {
  const styles: Record<FixedAsset["status"], string> = {
    "in-use": "border-emerald-500/30 text-emerald-500",
    disposed: "border-pink-500/30 text-pink-500",
    "fully-depreciated": "border-amber-500/30 text-amber-500",
  };

  const labels: Record<FixedAsset["status"], string> = {
    "in-use": "In Use",
    disposed: "Disposed",
    "fully-depreciated": "Depreciated",
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {labels[status]}
    </Badge>
  );
}

const columns: Array<TableWidgetColumn<FixedAsset>> = [
  {
    key: "name",
    header: "Asset",
    cell: (row) => (
      <div className="min-w-[200px]">
        <p className="text-sm font-medium truncate">{row.name}</p>
        <p className="text-xs text-muted-foreground truncate">{row.category}</p>
      </div>
    ),
  },
  {
    key: "purchaseDate",
    header: "Purchased",
    cell: (row) => <span className="text-sm text-muted-foreground">{row.purchaseDate}</span>,
    className: "w-[110px]",
  },
  {
    key: "cost",
    header: "Cost",
    cell: (row) => (
      <span className="text-sm tabular-nums text-muted-foreground">${row.cost.toLocaleString()}</span>
    ),
    className: "w-[110px]",
  },
  {
    key: "bookValue",
    header: "Book Value",
    cell: (row) => (
      <span className="text-sm font-medium tabular-nums">${row.bookValue.toLocaleString()}</span>
    ),
    className: "w-[110px]",
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
    className: "w-[120px]",
  },
];

export function FixedAssetsWidget() {
  return (
    <TableWidget
      title="Fixed Assets"
      description="Asset register"
      rows={fixedAssets}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
