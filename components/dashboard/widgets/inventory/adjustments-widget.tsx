"use client";

import { Badge } from "@/components/ui/badge";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { stockAdjustments, type StockAdjustment } from "@/mock-data/inventory";

function ReasonBadge({ reason }: { reason: StockAdjustment["reason"] }) {
  const styles: Record<StockAdjustment["reason"], string> = {
    damage: "border-pink-500/30 text-pink-500",
    "count-correction": "border-blue-500/30 text-blue-500",
    expiry: "border-amber-500/30 text-amber-500",
    return: "border-emerald-500/30 text-emerald-500",
    "write-off": "border-muted text-muted-foreground",
  };

  const labels: Record<StockAdjustment["reason"], string> = {
    damage: "Damage",
    "count-correction": "Count Fix",
    expiry: "Expiry",
    return: "Return",
    "write-off": "Write-off",
  };

  return (
    <Badge variant="outline" className={styles[reason]}>
      {labels[reason]}
    </Badge>
  );
}

const columns: Array<TableWidgetColumn<StockAdjustment>> = [
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
      <div className="min-w-[180px]">
        <p className="text-sm font-medium truncate">{row.itemName}</p>
        <p className="text-xs text-muted-foreground truncate">{row.sku}</p>
      </div>
    ),
  },
  {
    key: "quantity",
    header: "Qty",
    cell: (row) => (
      <span className={`text-sm font-medium tabular-nums ${row.quantity > 0 ? "text-emerald-500" : "text-pink-500"}`}>
        {row.quantity > 0 ? `+${row.quantity}` : row.quantity}
      </span>
    ),
    className: "w-[80px]",
  },
  {
    key: "reason",
    header: "Reason",
    cell: (row) => <ReasonBadge reason={row.reason} />,
    className: "w-[110px]",
  },
  {
    key: "adjustedBy",
    header: "Adjusted By",
    cell: (row) => <span className="text-sm text-muted-foreground truncate">{row.adjustedBy}</span>,
    className: "w-[130px]",
  },
];

export function AdjustmentsWidget() {
  return (
    <TableWidget
      title="Stock Adjustments"
      description="Inventory corrections"
      rows={stockAdjustments}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
