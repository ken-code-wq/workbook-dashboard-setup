"use client";

import { Badge } from "@/components/ui/badge";
import { TableWidget, type TableWidgetColumn } from "../base/table-widget";
import { stockItems, type StockItem } from "@/mock-data/inventory";

function StockBadge({ item }: { item: StockItem }) {
  const low = item.available <= item.reorderPoint;
  return low ? (
    <Badge variant="outline" className="border-pink-500/30 text-pink-500">
      Low
    </Badge>
  ) : (
    <Badge variant="outline" className="border-emerald-500/30 text-emerald-500">
      OK
    </Badge>
  );
}

const columns: Array<TableWidgetColumn<StockItem>> = [
  {
    key: "sku",
    header: "SKU",
    cell: (row) => <span className="text-sm font-mono">{row.sku}</span>,
    className: "w-[120px]",
  },
  {
    key: "name",
    header: "Item",
    cell: (row) => (
      <div className="min-w-[220px]">
        <p className="text-sm font-medium truncate">{row.name}</p>
        <p className="text-xs text-muted-foreground truncate">{row.location}</p>
      </div>
    ),
  },
  {
    key: "available",
    header: "Available",
    cell: (row) => <span className="text-sm tabular-nums">{row.available}</span>,
    className: "w-[120px]",
  },
  {
    key: "onHand",
    header: "On hand",
    cell: (row) => <span className="text-sm tabular-nums text-muted-foreground">{row.onHand}</span>,
    className: "w-[120px]",
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StockBadge item={row} />,
    className: "w-[100px]",
  },
];

export function StockLevelsWidget() {
  return (
    <TableWidget
      title="Stock Levels"
      description="By location and availability"
      rows={stockItems}
      columns={columns}
      rowKey={(row) => row.id}
    />
  );
}
