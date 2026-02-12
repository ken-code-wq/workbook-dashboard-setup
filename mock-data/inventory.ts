export interface StockItem {
  id: string;
  sku: string;
  name: string;
  location: string;
  onHand: number;
  available: number;
  reorderPoint: number;
}

export type StockMovementType = "receipt" | "sale" | "transfer" | "adjustment";

export interface StockMovement {
  id: string;
  date: string;
  sku: string;
  type: StockMovementType;
  quantity: number;
}

export const stockItems: StockItem[] = [
  { id: "stk-1", sku: "SKU-1001", name: "USB-C Cable (1m)", location: "WH-A", onHand: 420, available: 390, reorderPoint: 120 },
  { id: "stk-2", sku: "SKU-1002", name: "Wireless Mouse", location: "WH-A", onHand: 180, available: 165, reorderPoint: 80 },
  { id: "stk-3", sku: "SKU-2001", name: "Laptop Stand", location: "WH-B", onHand: 95, available: 92, reorderPoint: 50 },
  { id: "stk-4", sku: "SKU-3004", name: "Mechanical Keyboard", location: "WH-B", onHand: 62, available: 54, reorderPoint: 40 },
];

export const stockMovements: StockMovement[] = [
  { id: "mv-1", date: "2026-01-28", sku: "SKU-1001", type: "receipt", quantity: 200 },
  { id: "mv-2", date: "2026-01-29", sku: "SKU-1002", type: "sale", quantity: -18 },
  { id: "mv-3", date: "2026-01-30", sku: "SKU-2001", type: "transfer", quantity: -10 },
  { id: "mv-4", date: "2026-01-31", sku: "SKU-3004", type: "adjustment", quantity: 4 },
  { id: "mv-5", date: "2026-02-02", sku: "SKU-1001", type: "sale", quantity: -32 },
  { id: "mv-6", date: "2026-02-04", sku: "SKU-1002", type: "receipt", quantity: 60 },
];

export function getMovementsByType() {
  const sums = new Map<StockMovementType, number>();
  for (const movement of stockMovements) {
    const delta = Math.abs(movement.quantity);
    sums.set(movement.type, (sums.get(movement.type) ?? 0) + delta);
  }

  return Array.from(sums.entries()).map(([type, value]) => ({ type, value }));
}

// ---------------------------------------------------------------------------
// Stock Adjustments
// ---------------------------------------------------------------------------

export type AdjustmentReason = "damage" | "count-correction" | "expiry" | "return" | "write-off";

export interface StockAdjustment {
  id: string;
  date: string;
  sku: string;
  itemName: string;
  reason: AdjustmentReason;
  quantity: number;
  adjustedBy: string;
}

export const stockAdjustments: StockAdjustment[] = [
  { id: "adj-01", date: "2026-01-10", sku: "SKU-1001", itemName: "USB-C Cable (1m)", reason: "count-correction", quantity: 12, adjustedBy: "Ethan Kim" },
  { id: "adj-02", date: "2026-01-15", sku: "SKU-3004", itemName: "Mechanical Keyboard", reason: "damage", quantity: -3, adjustedBy: "James Brown" },
  { id: "adj-03", date: "2026-01-22", sku: "SKU-1002", itemName: "Wireless Mouse", reason: "return", quantity: 5, adjustedBy: "Mia Johnson" },
  { id: "adj-04", date: "2026-01-28", sku: "SKU-2001", itemName: "Laptop Stand", reason: "expiry", quantity: -2, adjustedBy: "Ethan Kim" },
  { id: "adj-05", date: "2026-02-04", sku: "SKU-1001", itemName: "USB-C Cable (1m)", reason: "write-off", quantity: -8, adjustedBy: "James Brown" },
];

// ---------------------------------------------------------------------------
// Stock Transfers
// ---------------------------------------------------------------------------

export type TransferStatus = "pending" | "in-transit" | "completed" | "cancelled";

export interface StockTransfer {
  id: string;
  date: string;
  sku: string;
  itemName: string;
  fromLocation: string;
  toLocation: string;
  quantity: number;
  status: TransferStatus;
}

export const stockTransfers: StockTransfer[] = [
  { id: "trf-01", date: "2026-01-08", sku: "SKU-1001", itemName: "USB-C Cable (1m)", fromLocation: "WH-A", toLocation: "WH-B", quantity: 50, status: "completed" },
  { id: "trf-02", date: "2026-01-16", sku: "SKU-1002", itemName: "Wireless Mouse", fromLocation: "WH-A", toLocation: "WH-C", quantity: 20, status: "completed" },
  { id: "trf-03", date: "2026-01-25", sku: "SKU-2001", itemName: "Laptop Stand", fromLocation: "WH-B", toLocation: "WH-A", quantity: 10, status: "in-transit" },
  { id: "trf-04", date: "2026-02-01", sku: "SKU-3004", itemName: "Mechanical Keyboard", fromLocation: "WH-B", toLocation: "WH-A", quantity: 8, status: "pending" },
  { id: "trf-05", date: "2026-02-05", sku: "SKU-1001", itemName: "USB-C Cable (1m)", fromLocation: "WH-B", toLocation: "WH-C", quantity: 30, status: "cancelled" },
];

// ---------------------------------------------------------------------------
// Stock Value Trend (area chart)
// ---------------------------------------------------------------------------

export interface StockValueMonth {
  month: string;
  value: number;
  cost: number;
}

export const stockValueTrend: StockValueMonth[] = [
  { month: "Jan", value: 142000, cost: 98000 },
  { month: "Feb", value: 148000, cost: 102000 },
  { month: "Mar", value: 155000, cost: 108000 },
  { month: "Apr", value: 151000, cost: 105000 },
  { month: "May", value: 162000, cost: 113000 },
  { month: "Jun", value: 170000, cost: 118000 },
  { month: "Jul", value: 168000, cost: 116000 },
  { month: "Aug", value: 175000, cost: 122000 },
  { month: "Sep", value: 182000, cost: 127000 },
  { month: "Oct", value: 178000, cost: 124000 },
  { month: "Nov", value: 185000, cost: 129000 },
  { month: "Dec", value: 192000, cost: 134000 },
];
